import { Application, Response, Request } from 'express';
import { Catogery, catogery } from '../models/catogery';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import parseJwt from '../service/jwtParsing';

dotenv.config();
const secret: string = process.env.token as unknown as string;

const catogery_obj = new Catogery();

async function index(req: Request, res: Response) {
    try {
        const resault = await catogery_obj.index();
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

async function show(req: Request, res: Response) {
    try {
        const resault = await catogery_obj.show(req.params.id as unknown as number);
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}


async function update(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    const user = parseJwt(token);
    const permession = jwt.verify(token, secret);

    let isSuperAdmin = false;
    if(req.body.admin_email == process.env.admin_email && req.body.admin_password == process.env.admin_password){
        isSuperAdmin=true;
    }

    if ((permession && user.user.status=='admin')||isSuperAdmin) {
        try {
            const c: catogery = {
                id: req.params.id as unknown as number,
                name: req.body.name,
            };
            const resault = await catogery_obj.update(c);
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed login first!!');
}

async function create(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    const user = parseJwt(token);
    const permession = jwt.verify(token, secret);

    let isSuperAdmin = false;
    if(req.body.admin_email == process.env.admin_email && req.body.admin_password == process.env.admin_password){
        isSuperAdmin=true;
    }

    if ((permession && user.user.status=='admin')||isSuperAdmin) {
        try {
            const c: catogery = {
                name: req.body.name,
            };
            const resault = await catogery_obj.create(c);
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed login first!!');
}

async function delete_(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    const user = parseJwt(token);
    const permession = jwt.verify(token, secret);

    let isSuperAdmin = false;
    if(req.body.admin_email == process.env.admin_email && req.body.admin_password == process.env.admin_password){
        isSuperAdmin=true;
    }

    if ((permession && user.user.status=='admin')||isSuperAdmin) {
        try {
            const resault = await catogery_obj.delete(
        req.params.id as unknown as number
            );
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed login first!!');
}

function mainRoutes(app: Application) {
    app.get('/categories', index);
    app.get('/categories/:id', show);
    app.post('/categories', create);
    app.patch('/categories/:id', update);
    app.delete('/categories/:id', delete_);
}

export default mainRoutes;
