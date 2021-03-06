import { Application, Response, Request } from 'express';
import { Coupon, coupon } from '../models/coupon';
import isAdminFun from '../service/isAdmin';
import { middelware } from '../service/middelware';
import { couponSchema } from '../service/validation';

const coupon_obj = new Coupon();
//return all coupons in database
async function index(req: Request, res: Response) {
    try {
        const resault = await coupon_obj.index();
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return only one coupon from databse using id in request params
async function show(req: Request, res: Response) {
    try {
        const resault = await coupon_obj.show(req.params.id as unknown as number);
        if(resault == undefined)
            return res.status(400).json('row not exist');
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

//update and return the coupon with id in request params and data in request body
async function update(req: Request, res: Response) {
    const token = req.headers.token as string;
    
    try {
    //check if the user super admin or admin
        const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
        //if admin or super admin the changes will occure to the coupon
        if (isAdmin) {
            const c = await coupon_obj.show(req.params.id as unknown as number);
            if(c == undefined)
                return res.status(400).json('row not exist');

            if(req.body.code as unknown as string)
                c.code = req.body.code as unknown as string;
            
            if(req.body.value_of_100)
                c.value_of_100 = req.body.value_of_100;
            const resault = await coupon_obj.update(c);
            res.status(200).json(resault);
        } else res.status(400).json('Not allowed this for you!!');
    } catch (e) {
        res.status(400).json(`${e}`);
    }
    
}

//create and return the coupon with data in request body
async function create(req: Request, res: Response) {
   
    const token = req.headers.token as string;
    
    try {
        //check if the user super admin or admin
        const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
        //if admin or super admin the changes will occure to the coupon
        if (isAdmin) {
            const c: coupon = {
                code: req.body.code,//required
                value_of_100:req.body.value_of_100
            };
            const resault = await coupon_obj.create(c);
            res.status(200).json(resault);
        } else res.status(400).json('Not allowed this for you!!');
    } catch (e) {
        res.status(400).json(`${e}`);
    }
    
}

//delete and return deleted using id in request params
async function delete_(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    
    try {
        //check if the user super admin or admin
        const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
        //if admin or super admin the changes will occure to the coupon
        if (isAdmin) {
            const resault = await coupon_obj.delete(
        req.params.id as unknown as number
            );
            res.status(200).json(resault);
        } else res.status(400).json('Not allowed this for you!!');
    } catch (e) {
        res.status(400).json(`${e}`);
    }
    
}

function mainRoutes(app: Application) {
    app.get('/coupons', index);
    app.get('/coupons/:id', show);
    app.post('/coupons', middelware(couponSchema.create), create);
    app.patch('/coupons/:id', middelware(couponSchema.update), update);
    app.delete('/coupons/:id', delete_);
}
 
export default mainRoutes;
