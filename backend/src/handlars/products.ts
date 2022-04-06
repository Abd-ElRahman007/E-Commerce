import { Application, Response, Request } from 'express';
import { Product, product } from '../models/products';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import parseJwt from '../service/jwtParsing';

dotenv.config();
const secret: string = process.env.token as unknown as string;

const product_obj = new Product();

async function index(req: Request, res: Response) {
    try {
        const model_result = await product_obj.index();
        
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        //pagination
        if(page && limit)
        {
            const start_index = (page-1)*limit;
            const end_index = (page)*limit;
            const result={next:{},data:{},previous:{}};
            if(model_result.length > end_index){
                result.next={page:page+1,limit:limit};
            }        

            if(start_index>0){
                result.previous={page:page-1,limit:limit};
            }
            result.data=model_result.slice(start_index,end_index);
            res.status(200).json(result);
        }else
            res.status(200).json(model_result);
        
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

async function show(req: Request, res: Response) {
    try {
        const result = await product_obj.show(req.params.id as unknown as number);
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

async function search_by_category(req: Request, res: Response) {
    try {
        const result = await product_obj.search_by_category(req.params.category_id as unknown as number);
        res.status(200).json(result);
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
            const p: product = {
                id: Number(req.params.id),
                name: req.body.name,
                price: Number(req.body.price),
                code:req.body.code,
                model:req.body.model,
                images:req.body.images,
                description:req.body.description,
                category_id:Number(req.body.category_id),
                currency:req.body.currency,
                vote_count:Number(req.body.vote_count),
                vote_total:Number(req.body.vote_total),
                stock:Number(req.body.stock),
                brand_id:Number(req.body.brand_id),
            };
            const result = await product_obj.update(p);
            res.status(200).json(result);
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
            const p: product = {
                name: req.body.name,
                price: Number(req.body.price),
                code:req.body.code,
                model:req.body.model,
                images:req.body.images,
                description:req.body.description,
                category_id:Number(req.body.category_id),
                currency:req.body.currency,
                vote_count:Number(req.body.vote_count),
                vote_total:Number(req.body.vote_total),
                stock:Number(req.body.stock),
                brand_id:Number(req.body.brand_id),
            };
            const result = await product_obj.create(p);
            res.status(200).json(result);
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
            const result = await product_obj.delete(
        req.params.id as unknown as number
            );
            res.status(200).json(result);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed login first!!');
}

function mainRoutes(app: Application) {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.get('/:category_id/products', search_by_category);
    app.post('/products', create);
    app.patch('/products/:id', update);
    app.delete('/products/:id', delete_);
}

export default mainRoutes;
