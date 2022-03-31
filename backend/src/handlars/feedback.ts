import { Application, Response, Request } from 'express';
import { Comment, comment } from '../models/feedback';
//import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
//const secret: string = process.env.token as unknown as string;

const comment_obj = new Comment();

async function index(req: Request, res: Response) {
    try {
        const resault = await comment_obj.index();
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

async function show(req: Request, res: Response) {
    try {
        const resault = await comment_obj.show(req.params.id as unknown as number);
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
            const c: comment = {
                id: req.params.id as unknown as number,
                subject: req.body.subject,
                message:req.body.message,
                created_time:req.body.created_time,
                user_id:Number(req.body.user_id),
                product_id:Number(req.body.product_id)
            };
            const resault = await comment_obj.update(c);
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
            const c: comment = {
                subject: req.body.subject,
                message:req.body.message,
                created_time:req.body.created_time,
                user_id:Number(req.body.user_id),
                product_id:Number(req.body.product_id)
            };
            const resault = await comment_obj.create(c);
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
            const resault = await comment_obj.delete(
        req.params.id as unknown as number
            );
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed login first!!');
}

function mainRoutes(app: Application) {
    app.get('/comments', index);
    app.get('/comments/:id', show);
    app.post('/comments', create);
    app.patch('/comments/:id', update);
    app.delete('/comments/:id', delete_);
}

export default mainRoutes;
