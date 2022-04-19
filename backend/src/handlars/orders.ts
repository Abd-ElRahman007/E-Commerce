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
// //update the order using user_id and id in req params [only user it self] 
async function update(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    
    try {
        const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);   
        //if user exist will return orders of user id
        if (isAdmin) {
        
            const status:string = req.body.status;
            const id = Number(req.params.order_id);
            let date:Date|null = new Date();
            if(status == 'open'){
                date = null;
            }
            else if(status == 'complete'){
                date = new Date();
            }
            else{
                date = null;
                const result = await order_obj.show(id,Number(req.params.user_id));
                const products:order_product[] = result.products;
                
                for(let i=0;i < products.length; i++){
                    products[i].order_id = id;
                    const p = await pro_obj.show(products[i].product_id);
                    
                    if(p == undefined)
                        return res.status(400).json(`id:${products[i].product_id} not exist now in stock.`);
    
                    p.stock = Number(p.stock) + Number(products[i].quantity);
    
                    
                    await pro_obj.update(p);
                    
                }
    
            }
            const resault = await order_obj.update(status,id,date);
            res.json(resault);
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
        }
        else 
            return res.status(400).json('token required.');
        //if user exist will return orders of user id
        if (isExist) {
        //const products = req.body.order_products  as order_product;
            const o: order = {
                status: 'open',
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
                    return res.status(400).json(`stock of ${p.name} with id:${p.id} has less than quantity.`);
                else{
                    await pro_obj.update(p);
                    await order_obj.addProduct(products[i]);
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
