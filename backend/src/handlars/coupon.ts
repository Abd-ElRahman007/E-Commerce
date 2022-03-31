import { Application, Response, Request } from 'express';
import { Coupon, coupon } from '../models/coupon';
//import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
//const secret: string = process.env.token as unknown as string;

const coupon_obj = new Coupon();

async function index(req: Request, res: Response) {
    try {
        const resault = await coupon_obj.index();
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

async function show(req: Request, res: Response) {
    try {
        const resault = await coupon_obj.show(req.params.id as unknown as number);
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

async function update(req: Request, res: Response) {
    //const token = req.headers.token as unknown as string;
    const permession = 1 ;//jwt.verify(token, secret);
    if (permession) {
        try {
            const c: coupon = {
                id: req.params.id as unknown as number,
                code: req.body.code,
                value_of_100:req.body.value_of_100
            };
            const resault = await coupon_obj.update(c);
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed login first!!');
}

async function create(req: Request, res: Response) {
    //const token = req.headers.token as unknown as string;
    const permession = 1;//jwt.verify(token, secret);
    if (permession) {
        try {
            const c: coupon = {
                code: req.body.code,
                value_of_100:req.body.value_of_100
            };
            const resault = await coupon_obj.create(c);
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed login first!!');
}

async function delete_(req: Request, res: Response) {
    //const token = req.headers.token as unknown as string;
    const permession = 1;//jwt.verify(token, secret);
    if (permession) {
        try {
            const resault = await coupon_obj.delete(
        req.params.id as unknown as number
            );
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed login first!!');
}

function mainRoutes(app: Application) {
    app.get('/coupons', index);
    app.get('/coupons/:id', show);
    app.post('/coupons', create);
    app.patch('/coupons/:id', update);
    app.delete('/coupons/:id', delete_);
}

export default mainRoutes;
