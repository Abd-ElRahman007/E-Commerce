import { Application, Response, Request } from 'express';
import { Comment, comment } from '../models/feedback';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import parseJwt from '../service/jwtParsing';

dotenv.config();
const secret: string = process.env.token as unknown as string;

const comment_obj = new Comment();

async function index(req: Request, res: Response) {
    try {
        const resault = await comment_obj.index(Number(req.params.product_id));
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

async function show(req: Request, res: Response) {
    try {
        const resault = await comment_obj.show(Number(req.params.product_id),Number(req.params.id));
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

async function update(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    const user = parseJwt(token);
    const permession = jwt.verify(token, secret);
    if (permession) {
        try {
            const c: comment = {
                id: Number(req.params.id),
                subject: req.body.subject,
                message:req.body.message,
                user_id:Number(user.user.id),
                product_id:Number(req.params.product_id),
                vote:Number(req.body.vote)
            };
            const resault = await comment_obj.update(c);
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed!!');
}

async function create(req: Request, res: Response) {
    
    const token = req.headers.token as unknown as string;
    const user = parseJwt(token);
    const permession = jwt.verify(token, secret);
    if (permession) {
        try {
            const c: comment = {
                subject: req.body.subject,
                message:req.body.message,
                user_id:Number(user.user.id),
                product_id:Number(req.params.product_id),
                vote:Number(req.body.vote)
            };
            const resault = await comment_obj.create(c);
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed login first!!');
}

async function delete_(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    const permession = jwt.verify(token, secret);
    const user = parseJwt(token);

    let isSuperAdmin = false;
    if(req.body.admin_email == process.env.admin_email && req.body.admin_password == process.env.admin_password){
        isSuperAdmin=true;
    }

    if (permession ||isSuperAdmin) {
        try {
            const resault = await comment_obj.delete(Number(req.params.product_id),Number(req.params.id),Number(user.user.id));
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed login first!!');
}

function mainRoutes(app: Application) {
    
    app.get('/products/:product_id/comments', index);
    app.get('/products/:product_id/comments/:id', show);
    app.post('/products/:product_id/comments', create);
    app.patch('/products/:product_id/comments/:id', update);
    app.delete('/products/:product_id/comments/:id', delete_);


}

export default mainRoutes;
