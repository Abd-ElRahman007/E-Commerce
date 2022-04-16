import { Application, Response, Request } from 'express';
import { Order, order ,order_product} from '../models/orders';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import isAdminFun from '../service/isAdmin';
import { number, object } from 'joi';
import parseJwt from '../service/jwtParsing';
dotenv.config();

const secret: string = process.env.token as unknown as string;



const order_obj = new Order();
//return orders of a user_id in req params
async function index(req: Request, res: Response) {
    let isExist = false;
    const token = req.headers.token as unknown as string;
    //check if the request from super admin?
    const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
    if(token){
        const permession = jwt.verify(token,secret);
        const user__ = parseJwt(token);
        if(permession && (parseInt(req.params.id) == parseInt(user__.user.id)))
            isExist = true;
    }
    //if admin or super or user admin will return orders of user id
    if (isAdmin || isExist) {
        try {
            const resault = await order_obj.index(parseInt(req.params.user_id));
            res.json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed!!');
    
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
        if(permession && (parseInt(req.params.id) == parseInt(user__.user.id)))
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
    } else res.send('Not allowed login first!!');
   
}
//update the order using user_id and id in req params [only user it self] 
async function update(req: Request, res: Response) {
    let isExist = false;
    const token = req.headers.token as unknown as string;
    if(token){
        const permession = jwt.verify(token,secret);
        if(permession)
            isExist = true;
    }
    //if user exist will return orders of user id
    if (isExist) {
        
        try {
            const o = await order_obj.show(req.params.id as unknown as number, req.params.user_id as unknown as number);

            if(req.body.status)  
                o.status = req.body.status;
            if(req.body.total)  
                o.total = Number(req.body.total);
            if(req.body.time_start)  
                o.time_start = req.body.time_start;
            if(req.body.time_arrival)      
                o.time_arrival = req.body.time_arrival;
            if(req.body.compelete_at)    
                o.compelete_at = req.body.compelete_at;
            
            const resault = await order_obj.update(o);
            res.json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed login first!!');
}

//create order for a user id in req params
async function create(req: Request, res: Response) {
    let isExist = false;
    const token = req.headers.token as unknown as string;
    if(token){
        const permession = jwt.verify(token,secret);
        if(permession)
            isExist = true;
    }
    //if user exist will return orders of user id
    if (isExist) {
        const products = req.body.order_products  as order_product;
        const o: order = {
            status: 'open',
            user_id: parseInt(req.params.user_id),
            total:Number(req.body.total),
            time_arrival:req.body.time_arrival,
            compelete_at:req.body.compelete_at,
        };
        try {            
            const resault = await order_obj.create(o);
            const id = resault.id as unknown as number;
            // for(let i=0;i < products.length(); i++){
            //     await order_obj.addProduct(
            //         id,
            //         parseInt(products[i].product_id),
            //         parseInt(products[i].quantity)
            //     );
            // }

            res.json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed login first!!');
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
    } else res.send('Not allowed login first!!');
}
//add product to the order using user id and order id in params [user only]
async function addProduct(req: Request, res: Response) {
    
    let isExist = false;
    const token = req.headers.token as unknown as string;
    if(token){
        const permession = jwt.verify(token,secret);
        if(permession)
            isExist = true;
    }


    //if user exist will return orders of user id
    if (isExist) {
        try {
            const resault = await order_obj.addProduct(
                parseInt(req.params.order_id),
                parseInt(req.body.product_id),
                parseInt(req.body.quantity)
            );
            res.json(resault);
            
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    }else 
        res.send('Not allowed login first!!');

}
function mainRoutes(app: Application) {
    app.get('/users/:user_id/orders', index);
    app.get('/users/:user_id/orders/:order_id', show);
    app.post('/users/:user_id/orders', create);
    app.post('/users/:user_id/orders/:order_id/products', addProduct);
    app.patch('/users/:user_id/orders/:order_id', update);
    app.delete('/users/:user_id/orders/:order_id', delete_);
}

export default mainRoutes;
