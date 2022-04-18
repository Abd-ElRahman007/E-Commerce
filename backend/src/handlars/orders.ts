import { Application, Response, Request } from 'express';
import { Order, order, order_product } from '../models/orders';
import { Product } from '../models/products';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import isAdminFun from '../service/isAdmin';
import parseJwt from '../service/jwtParsing';
dotenv.config();

const secret: string = process.env.token as unknown as string;


const order_obj = new Order();
const pro_obj = new Product();
//return orders of a user_id in req params
async function index(req: Request, res: Response) {
    let isExist = false;
    const token = req.headers.token as unknown as string;
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
        try {
            const resault = await order_obj.index(parseInt(req.params.user_id));
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.status(400).send('Not allowed!!');
    
}

//return one order of a user_id and id in req params [admin and user it self]
async function show(req: Request, res: Response) {
    
    let isExist = false;
    const token = req.headers.token as unknown as string;
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
        try {
            const resault = await order_obj.show(
                parseInt(req.params.order_id),
                parseInt(req.params.user_id)
            );
            res.json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.status(400).json('Not allowed login first!!');
   
}
// //update the order using user_id and id in req params [only user it self] 
async function update(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);   
    //if user exist will return orders of user id
    if (isAdmin) {
        
        try {
            const status:string = req.body.status;
            const id = Number(req.params.order_id);
            let date:Date|null = new Date();
            if(status != 'complete'){
                date = null;
            }
            const resault = await order_obj.update(status,id,date);
            res.json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.status(400).json('Not allowed.');
}

//create order for a user id in req params
async function create(req: Request, res: Response) {
    let isExist = false;
    const token = req.headers.token as unknown as string;
    if(token){
        const user__ = parseJwt(token);
        const permession = jwt.verify(token,secret);
        if(permession && (parseInt(req.params.user_id) == parseInt(user__.user.id)))
            isExist = true;
    }
    //if user exist will return orders of user id
    if (isExist) {
        //const products = req.body.order_products  as order_product;
        const o: order = {
            status: 'open',
            user_id: parseInt(req.params.user_id),
            total: Number(req.body.order.total),
            time_arrival: req.body.order.time_arrival,
            compelete_at: req.body.order.compelete_at,
            shipping_cost: parseInt(req.body.order.shipping_cost),
            shipping_address: req.body.order.shipping_address as string,
            taxes: parseInt(req.body.order.taxes),
            payment: req.body.order.payment as string
        };
        const products = req.body.order.products as Array<order_product>;
        try {            
            const resault = await order_obj.create(o);
            const id = resault.id as unknown as number;
            for(let i=0;i < products.length; i++){
                products[i].order_id = id;
                const p = await pro_obj.show(products[i].product_id);
                p.stock = Number(p.stock) - Number(products[i].quantity);
                if(p.stock < 0)
                    res.status(400).json('stock has less than quantity.');
                else{
                    await pro_obj.update(p);
                    await order_obj.addProduct(products[i]);
                }
                
            }

            res.json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.status(400).json('Not allowed login first!!');
}
//delete order using user id and order id in params [admins only]
async function delete_(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    //check if the request from super admin?
    const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
    //if admin or super or user admin will return orders of user id
    if (isAdmin) {
        try {
            const resault = await order_obj.delete(
                parseInt(req.params.order_id),
                parseInt(req.params.user_id)
            );
            res.json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.status(400).json('Not allowed login first!!');
}

function mainRoutes(app: Application) {
    app.get('/users/:user_id/orders', index);
    app.get('/users/:user_id/orders/:order_id', show);
    app.patch('/users/:user_id/orders/:order_id', update);
    app.post('/users/:user_id/orders', create);
    app.delete('/users/:user_id/orders/:order_id', delete_);
}

export default mainRoutes;
