import { Application, Response, Request } from 'express';
import { Order, order, order_product } from '../models/orders';
import { Product } from '../models/products';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import isAdminFun from '../service/isAdmin';
import {orderSchema} from '../service/validation';
import parseJwt from '../service/jwtParsing';
import { middelware } from '../service/middelware';
import { user } from '../models/users';
dotenv.config();

const secret: string = process.env.token as unknown as string;


const order_obj = new Order();
const pro_obj = new Product();
//return orders of a user_id in req params
async function index(req: Request, res: Response) {
    let isExist = false;
    const token = req.headers.token as unknown as string;
    
    try {
        //check if the request from super admin?
        const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
        if(token){
            const permession = jwt.verify(token,secret);
            const user__ = parseJwt(token);
            if(permession && (parseInt(req.params.user_id) == parseInt(user__.user.id)))
                isExist = true;
        }
        //if admin or super or user admin will return orders of user id
        if (isAdmin || isExist) {
            const resault = await order_obj.index(parseInt(req.params.user_id));
            res.status(200).json(resault);
        } else res.status(400).send('Not allowed!!');
    } catch (e) {
        res.status(400).json(`${e}`);
    }
    
}
//return orders of a user_id in req params
async function all_index(req: Request, res: Response) {
    
    const token = req.headers.token as unknown as string;
    
    try {
        //check if the request from super admin?
        const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
        
        //if admin or super or user admin will return orders of user id
        if (isAdmin) {
            const resault = await order_obj.all_index();
            res.status(200).json(resault);
        } else res.status(400).send('Not allowed!!');
    } catch (e) {
        res.status(400).json(`${e}`);
    }
    
}
//return one order of a user_id and id in req params [admin and user it self]
async function show(req: Request, res: Response) {
    
    let isExist = false;
    const token = req.headers.token as unknown as string;
    
    try {
        //check if the request from super admin?
        const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
        if(token){
            const permession = jwt.verify(token,secret);
            const user__ = parseJwt(token);
            if(permession && (parseInt(req.params.user_id) == parseInt(user__.user.id)))
                isExist = true;
        }
        //if admin or super admin or user will return orders of user id [admin and user itself]
        if (isAdmin || isExist) {
            const resault = await order_obj.show(parseInt(req.params.order_id), parseInt(req.params.user_id));
            if(resault == undefined)
                return res.status(400).json('row not exist');

            res.json(resault);
        } else res.status(400).json('Not allowed login first!!');
    } catch (e) {
        res.status(400).json(`${e}`);
    }
   
}
//update the order using user_id and id in req params [only user it self] 
async function update(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    let isExist = false;
    try {
        const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);   

        if(token){
            const permession = jwt.verify(token,secret);
            const user__ = parseJwt(token);
            if(permession && (parseInt(req.params.user_id) == parseInt(user__.user.id)))
                isExist = true;
        }
        const order__ = await order_obj.show(Number(req.params.order_id),Number(req.params.user_id));
        const products_in_database:order_product[] = order__.products;
        const products_in_body:order_product[] = req.body.products;
        //if user exist will return orders of user id
        if(isExist){
               
            if(req.body.shipping_address){//
                order__.order.shipping_address = req.body.shipping_address;
            }
            if(req.body.payment){//
                order__.order.payment = req.body.payment;
            }
            //update the product with new data and update changes in database and return to front new updates    
            await order_obj.update(order__.order);
            
            for(let i=0;i<products_in_body.length;i++){
                for(let j=0;j<products_in_database.length;j++){
                    if(products_in_body[i].product_id == products_in_database[j].product_id)
                    {
                        products_in_body[i].command = 'update';
                        products_in_database[j].command = 'update';
                        products_in_database[j].quantity = Number(products_in_body[i].quantity) - Number(products_in_database[j].quantity);
                    }
                }
            }

            for(let j=0;j<products_in_database.length;j++){
                if(products_in_database[j].command != 'update')
                {
                    products_in_database[j].command = 'delete';
                }
            }

            for(let j=0;j<products_in_body.length;j++){
                if(products_in_body[j].command != 'update')
                {
                    products_in_body[j].command = 'insert';
                }
            }


            for(let j=0;j<products_in_database.length;j++){
                if(products_in_database[j].command == 'update')
                {
                    products_in_body[j].order_id = Number(req.params.order_id);
                    const p = await pro_obj.show(products_in_body[j].product_id);
                
                    if(p == undefined)
                        return res.status(400).json(`id:${products_in_body[j].product_id} not exist.`);

                    p.stock = Number(p.stock) - Number(products_in_body[j].quantity);

                    if(p.stock < 0)
                        return res.status(400).json(`stock of ${p.name} with id:${p.id} has less than quantity: ${p.stock+products_in_body[j].quantity}.`);
                    
                    await pro_obj.update(p);
                    await order_obj.addProduct(products_in_body[j].quantity, Number(products_in_body[j].order_id), products_in_body[j].product_id);
                    
                }

                if(products_in_database[j].command == 'delete')
                {
                    const p = await pro_obj.show(products_in_database[j].product_id);
                    
                    if(p == undefined)
                        return res.status(400).json(`id:${products_in_database[j].product_id} not exist now in stock.`);
    
                    p.stock = Number(p.stock) + Number(products_in_database[j].quantity);
    
                    await pro_obj.update(p);
                    await order_obj.deleteProduct(Number(req.params.order_id),Number(p.id));

                }
            }
            
            for(let j=0;j<products_in_body.length;j++){
                if(products_in_body[j].command == 'insert')
                {
                    products_in_body[j].order_id = Number(req.params.order_id);
                    const p = await pro_obj.show(products_in_body[j].product_id);
                
                    if(p == undefined)
                        return res.status(400).json(`id:${products_in_body[j].product_id} not exist.`);

                    p.stock = Number(p.stock) - Number(products_in_body[j].quantity);

                    if(p.stock < 0)
                        return res.status(400).json(`stock of ${p.name} with id:${p.id} has less than quantity: ${p.stock+products_in_body[j].quantity}.`);
                    
                    await pro_obj.update(p);
                    await order_obj.addProduct(products_in_body[j].quantity, Number(products_in_body[j].order_id), products_in_body[j].product_id);
                    
                }
            }
            const all = await order_obj.show(Number(req.params.order_id),Number(req.params.user_id));
            console.log(all);
            
            return res.status(200).json(all);
        }
        else if (isAdmin) {
            //console.log('admin');
            if(req.body.time_arrival){
                order__.order.time_arrival = req.body.time_arrival;
            }
            if(req.body.taxes){
                order__.order.taxes = Number(req.body.taxes);
            }
            if(req.body.shipping_cost){
                order__.order.shipping_cost = parseInt(req.body.shipping_cost);
            }
            if(req.body.status){//
                order__.order.status = req.body.status;
            }
            if(req.body.total){
                order__.order.total = parseInt(req.body.total);
            }
            const id = Number(req.params.order_id);

            if(order__.order.status == 'complete'){
                order__.order.compelete_at = new Date();
            }
            else if (order__.order.status == 'canceled'){
                                
                for(let i=0;i < products_in_database.length; i++){
                    products_in_database[i].order_id = id;
                    const p = await pro_obj.show(products_in_database[i].product_id);
                    
                    if(p == undefined)
                        return res.status(400).json(`id:${products_in_database[i].product_id} not exist now in stock.`);
    
                    p.stock = Number(p.stock) + Number(products_in_database[i].quantity);
    
                    
                    await pro_obj.update(p);
                    
                }
                const d = await order_obj.delete(id,Number(req.params.user_id));
                return res.status(200).json(d);
    
            }
            await order_obj.update(order__.order);
            const all = await order_obj.show(Number(req.params.order_id),Number(req.params.user_id));
            return res.status(200).json(all);
        } else res.status(400).json('Not allowed.');

    } catch (e) {
        res.status(400).json(`${e}`);
    }
    
}

//create order for a user id in req params
async function create(req: Request, res: Response) {
    let isExist = false;
    const token = req.headers.token as unknown as string;
    
    try { 
        let user_:user;
        if(token){
            user_ = parseJwt(token).user;
            const permession = jwt.verify(token,secret);
            if(permession && (parseInt(req.params.user_id) == Number(user_.id)))
                isExist = true;
            else{
                return res.status(400).json(`id: ${req.params.id} or token error. `);
            }
        }
        else 
            return res.status(400).json('token required.');
        //if user exist will return orders of user id
        if (isExist) {
        //const products = req.body.order_products  as order_product;
            const o: order = {
                status: 'pendding',
                user_id: Number(user_.id),
                total: Number(req.body.total),
                time_arrival: req.body.time_arrival,
                shipping_cost: parseInt(req.body.shipping_cost),
                shipping_address: req.body.shipping_address as string,
                taxes: parseInt(req.body.taxes),
                payment: req.body.payment as string
            };
            const products = req.body.products as Array<order_product>;           
            const resault = await order_obj.create(o);
            const id = resault.id as unknown as number;
            for(let i=0;i < products.length; i++){
                products[i].order_id = id;
                const p = await pro_obj.show(products[i].product_id);
                
                if(p == undefined)
                    return res.status(400).json(`id:${products[i].product_id} not exist.`);

                p.stock = Number(p.stock) - Number(products[i].quantity);

                if(p.stock < 0)
                    return res.status(400).json(`stock of ${p.name} with id:${p.id} has less than quantity: ${p.stock+products[i].quantity}.`);
                else{
                    await pro_obj.update(p);
                    await order_obj.addProduct(products[i].quantity, Number(products[i].order_id), products[i].product_id);
                }
                
            }

            res.json(resault);
        } else res.status(400).json('Not allowed login first!!');
    } catch (e) {
        res.status(400).json(`${e}`);
    }
    
}
//delete order using user id and order id in params [admins only]
async function delete_(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    
    try {
        //check if the request from super admin?
        const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
        //if admin or super or user admin will return orders of user id
        if (isAdmin) {
            const products:order_product[] = (await order_obj.show(parseInt(req.params.order_id),parseInt(req.params.user_id))).products;
            for(let j=0;j<products.length;j++)
            {
                const p = await pro_obj.show(products[j].product_id);
                    
                if(p == undefined)
                    return res.status(400).json(`id:${products[j].product_id} not exist now in stock.`);
    
                p.stock = Number(p.stock) + Number(products[j].quantity);
    
                await pro_obj.update(p);
                await order_obj.deleteProduct(Number(req.params.order_id),Number(p.id));

            }
            const resault = await order_obj.delete(
                parseInt(req.params.order_id),
                parseInt(req.params.user_id)
            );
            res.json(resault);
        } else res.status(400).json('Not allowed for you.');
    } catch (e) {
        res.status(400).json(`${e}`);
    }
    
}

function mainRoutes(app: Application) {
    app.get('/users/:user_id/orders', index);
    app.get('/all/orders', all_index);
    app.get('/users/:user_id/orders/:order_id', show);
    app.patch('/users/:user_id/orders/:order_id', middelware(orderSchema.update), update);
    app.post('/users/:user_id/orders', middelware(orderSchema.create), create);
    app.delete('/users/:user_id/orders/:order_id', delete_);
}

export default mainRoutes;
