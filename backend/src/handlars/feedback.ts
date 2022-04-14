import { Application, Response, Request } from 'express';
import { Comment, comment } from '../models/feedback';
import parseJwt from '../service/jwtParsing';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const {secret} = process.env;
const comment_obj = new Comment();
//return all comments for one product with id in request params from database
async function index(req: Request, res: Response) {
    try {
        const resault = await comment_obj.index(Number(req.params.product_id));
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return only one comment from databse using id and product_id in request params
async function show(req: Request, res: Response) {
    try {
        const resault = await comment_obj.show(Number(req.params.product_id),Number(req.params.id));
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

//update and return the comment with id and product_id in request params and data in request body
async function update(req: Request, res: Response) {
    let id,isTrue = false;
    const token = req.headers.token as unknown as string;
    if(token){//make sure that token is exist
        const user = parseJwt(token);
        id = user.user.id;
        const permession = jwt.verify(token, secret as string);
        if(permession){
            isTrue = true;
        }
    }
    if (isTrue) {
        const c = await comment_obj.show(req.params.product_id as unknown as number, req.params.id as unknown as number);
        try {
            
            if(req.body.subject)  
                c.subject = req.body.subject;

            if(req.body.message)  
                c.message = req.body.message;

            if(req.body.user_id)  
                c.user_id = id;

            if(req.body.vote)  
                c.vote = Number(req.body.vote);
            //update and return new comment data
            const resault = await comment_obj.update(c);
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed!!');
}
//create and return the comment with product_id in request params and data in request body
async function create(req: Request, res: Response) {
    
    let id,isTrue = false;
    const token = req.headers.token as unknown as string;
    if(token){//make sure that token is exist
        const user = parseJwt(token);
        id = user.user.id;
        const permession = jwt.verify(token, secret as string);
        if(permession){
            isTrue = true;
        }
    }
    if (isTrue) {
        try {
            const c: comment = {
                subject: req.body.subject,
                message:req.body.message,
                user_id:id,
                product_id:Number(req.params.product_id),
                vote:Number(req.body.vote)
            };
            //update and return new comment data
            const resault = await comment_obj.create(c);
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed login first!!');
}
//delete and return deleted using id and product_id in request params
async function delete_(req: Request, res: Response) {
    let isTrue = false;
    const token = req.headers.token as unknown as string;
    if(token){
        const permession = jwt.verify(token, secret as string);
        if(permession){
            isTrue = true;
        }
    }
    //if token is exist will delete the comment with product_id and id in params
    if (isTrue) {
        try {
            const resault = await comment_obj.delete(Number(req.params.product_id),Number(req.params.id));
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
