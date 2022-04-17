import { Application, Response, Request } from 'express';
import { Comment, comment } from '../models/feedback';
import parseJwt from '../service/jwtParsing';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import isAdmin from '../service/isAdmin';
import {middelware} from '../service/middelware';
import {commentSchema} from '../service/validation';
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
        }else res.status(400).json('user not exist.');
    }else res.status(400).json('login required.');

    if (isTrue) {

        try {
            const c = await comment_obj.show(req.params.product_id as unknown as number, req.params.id as unknown as number);
        
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
    } else res.status(400).json('user not exist.');
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
        }else res.status(400).json('user not exist.');

    }else res.status(400).json('login required.');

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
    } else res.status(400).json('user not exist.');
}
//delete and return deleted using id and product_id in request params
async function delete_(req: Request, res: Response) {
    const {admin_email,admin_password} = process.env;
    let isTrue = false;
    const token = req.headers.token as unknown as string;
    if(token){
        const permession = jwt.verify(token, secret as string);
        if(permession){
            isTrue = true;
        } else res.status(400).json('user not exist.');

    } else res.status(400).json('login required.');

    const user = parseJwt(token).user;
    //if token is exist will delete the comment with product_id and id in params
    if (isAdmin(admin_email as string ,admin_password as string,token) || isTrue) {
        try {
            const resault = await comment_obj.delete(Number(req.params.product_id),Number(req.params.id),Number(user.id));
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
        
    } else res.status(400).json('user not exist.');
}

function mainRoutes(app: Application) {
    
    app.get('/products/:product_id/comments', index);
    app.get('/products/:product_id/comments/:id', show);
    app.post('/products/:product_id/comments', middelware(commentSchema.create), create);
    app.patch('/products/:product_id/comments/:id', middelware(commentSchema.create), update);
    app.delete('/products/:product_id/comments/:id', delete_);


}

export default mainRoutes;
