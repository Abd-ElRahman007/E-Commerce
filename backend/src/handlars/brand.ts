import { Application, Response, Request } from 'express';
import { Brand, brand } from '../models/brand';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import parseJwt from '../service/jwtParsing';

dotenv.config();
const secret: string = process.env.token as unknown as string;

const brand_obj = new Brand();

async function index(req: Request, res: Response) {
    
    try {
        const resault = await brand_obj.index();
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

async function show(req: Request, res: Response) {
    try {
        const resault = await brand_obj.show(req.params.id as unknown as number);
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
//

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
            const b: brand = {
                id:Number(req.params.id),
                name: req.body.name,
                description:req.body.description
            };
            const resault = await brand_obj.update(b);
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
            const b: brand = {
                name: req.body.name,
                description:req.body.description
            };
            const resault = await brand_obj.create(b);
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
            const resault = await brand_obj.delete(Number(req.params.id));
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed login first!!');
}

function mainRoutes(app: Application) {
    app.get('/brands', index);
    app.get('/brands/:id', show);
    app.post('/brands', create);
    app.patch('/brands/:id', update);
    app.delete('/brands/:id', delete_);
}

export default mainRoutes;
