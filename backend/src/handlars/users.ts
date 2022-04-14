import { Application, Response, Request } from 'express';
//import nodemailer from 'nodemailer';
import { User, user } from '../models/users';
import parseJwt from '../service/jwtParsing';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const secret: string = process.env.token as unknown as string;
const user_obj = new User();

//return a json data for all users in database [allowed only for admins]
async function index(req: Request, res: Response) {
    const{admin_email, admin_password} = process.env;
    const token = req.headers.token as unknown as string;

    try {
        //check if the request from super admin?
        let isAdmin = false;
        if(req.body.admin_email === admin_email && req.body.admin_password === admin_password){
            isAdmin=true;
        }else if(token) //check request by using token to sure that request from admin
        {
            const permession = jwt.verify(token, secret);

            if(permession)
            {
                const user = parseJwt(token);
                if(user.user.status==='admin')
                    isAdmin = true;
            }
        }
        //if request from admin or super admin will return data
        if (isAdmin) {
            try {
                const resault = await user_obj.index();
                
                res.status(200).json(resault);
            } catch (e) {
                res.status(400).json(`${e}`);
            }
        } else res.send('Not allowed for you!!');//else will return not allowed
    } catch (e) {
        res.status(400).send(`${e}`);
    }
}
//return json data for a sungle user [allowed only for admins or user it self]
async function show(req: Request, res: Response) {
    try {
        const{admin_email, admin_password}=process.env;
        
        const token = req.headers.token as unknown as string;
        //check is request from admin or user it self
        let isAdmin = false;
        if(req.body.admin_email === admin_email && req.body.admin_password === admin_password){
            isAdmin=true;
        }else if(token)//check by token
        {
            const permession = jwt.verify(token, secret);

            if(permession)
            {
                const user = parseJwt(token);

                if(user.user.status==='admin' || user.user.id == parseInt(req.params.id))
                    isAdmin = true;
            }
        }
        //if admin or user it self will return user data
        if (isAdmin) {
            
            try {
                const resault = await user_obj.show(parseInt(req.params.id));
                res.status(200).json(resault);
            } catch (e) {
                res.status(400).json(`${e}`);
            }
        } else res.send('Not allowed login first!!');//else will return not allowed
    } catch (e) {
        res.status(400).send(`${e}`);
    }
}
/*
return token for updated user [user can update all his data except (coupon_id, status), 
    super admin can update only(coupon_id,status),
    admins can update (coupon_id, status when not == admin)]*/
async function update(req: Request, res: Response) {
    let user_type = 'user';
    const{admin_email, admin_password}=process.env;
    const token = req.headers.token as unknown as string;
    const id = parseInt(req.params.id);
    try {
        const user_ = await user_obj.show(id);//get user from database with id in request params
        //check if request from super admin 
        if(req.body.admin_email === admin_email && req.body.admin_password === admin_password){
            user_type = 'super_admin';
        }else if(token){//check the token if exist to know if admin or user want to update
            const permession = jwt.verify(token, secret);

            if(permession)
            {
                const user = parseJwt(token);
                if(user.user.id == id)
                    user_type = 'user';
                else
                    user_type = 'admin'; 
            }
        }
        //if user send the request
        if(user_type === 'user'){
            if(req.body.f_name)
                user_.f_name=req.body.f_name;
            if(req.body.l_name)
                user_.f_name=req.body.l_name;
            if(req.body.email)
                user_.email=req.body.email;
            if(req.body.password)
            {
                const hash = bcrypt.hashSync(req.body.password+process.env.extra, parseInt(process.env.round as string));
                user_.password=hash;
            }
            if(req.body.birthday)
                user_.birthday=req.body.birthday;
            if(req.body.phone)
                user_.phone=req.body.phone;
            if(req.body.city)
                user_.city=req.body.city;
            if(req.body.address)
                user_.address=req.body.address;

        }else {//if admin or super admin

            if(req.body.coupon_id)
                user_.coupon_id = parseInt(req.body.coupon_id);
            if(req.body.status){
                if(req.body.status != 'admin')
                    user_.status = req.body.status;
                else if(req.body.status == 'admin' && user_type === 'super_admin'){
                    user_.status = req.body.status;
                }
            }
            
        }
        //update and return the new token of updated user
        const resualt = await user_obj.update(user_);
        const new_token = jwt.sign({user:resualt},secret);
        res.status(200).json(new_token);

    } catch (e) {
        res.status(400).send(`${e}`);
    }
}
//create user by getting user data from request body
async function create(req: Request, res: Response) {
    //hashin password using round and extra from .env file and password from request.body
    const hash = bcrypt.hashSync(req.body.password + process.env.extra, parseInt(process.env.round as string));
    //create type user with getting data to send to the database
    const u: user = {
        f_name:req.body.f_name, 
        l_name:req.body.l_name, 
        email:req.body.email, //required
        password:hash, //required
        birthday:req.body.birthday, 
        phone:req.body.phone, 
        status:'active',//the default of status is active 
        city:req.body.city,
        address:req.body.address,
        coupon_id:req.body.coupon_id
    };
    //send user type to the database to create
    try {                
        const resault = await user_obj.create(u);
        const token = jwt.sign({ user: resault }, secret);
        res.status(200).json(token);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return deleted and delete user using id in request params [only user delete it self]
async function delete_(req: Request, res: Response) {
    let isTrue = false;
    const token = req.headers.token as unknown as string;
    const id = parseInt(req.params.id);

    if(token) //check request by using token to sure that request from admin
    {
        const permession = jwt.verify(token, secret);

        if(permession)
        {
            const user = parseJwt(token);
            if(user.user.id == id)
                isTrue = true;
        }
    }
    if (isTrue) {//if token exist and the request params.id == token user.id
        try {
            const resault = await user_obj.delete(id); //delete user from database by id
            res.status(200).json(resault); //return deleted
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed !!');//else returned not allowed
}
//return token for user and login the user using email and password from request body
async function login(req: Request, res: Response) {
    const { email, password } = req.body;//required

    try {
        //hash the password to search by hashing and email in database 
        const hash = bcrypt.hashSync(password + process.env.extra, parseInt(process.env.round as string));
        //search in database by input data
        const resault = await user_obj.auth(email, hash);
    
        if(resault){//if their is user in database with input data will return token for that uer
            const user_token = jwt.sign({user:resault},secret);
            res.status(200).json(user_token);
        }
        else res.status(400).send('failed');//else return failed
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
//////////////////////////not finish yet////////////////////////////////////
async function forget_password(req: Request, res: Response) {
    try {
        const { email } = req.body;

        const resault = await user_obj.forget_password(email);
       
        if(resault){
            if (resault.status!='suspended') {
                //const token = jwt.sign({ user: resault }, secret);

                res.status(200).json('check your email.');
            }else
                res.status(400).json('user suspended');
        }
        else res.status(400).send('failed');
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
/////////////////////////////////////////////////////////////////////////

////////////////////////////not finish yet///////////////////////////////
async function reset_password(req: Request, res: Response) {
    try {
        const token = req.headers.token as unknown as string;
        const user = parseJwt(token);
        const permession = jwt.verify(token,secret);
        if(permession){
            const result = user_obj.reset_password(user.user);
            const newToken = jwt.sign({ user: result }, secret);
            res.status(200).json({user:user,token:newToken});
        }else
            res.status(400).json('user not exist');
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
/////////////////////////////////////////////////////////////////////
//return token for user with id from request params [only for admins]
async function get_token(req: Request, res: Response) {
    
    let isAdmin = false;
    const{admin_email, admin_password} = process.env;
    const token = req.headers.token as unknown as string;
    
    try {
        //check if the request from super admin?
        if(req.body.admin_email === admin_email && req.body.admin_password === admin_password){
            isAdmin=true;
        }else if(token) //check request by using token to sure that request from admin
        {
            const permession = jwt.verify(token, secret);

            if(permession)
            {
                const user = parseJwt(token);
                if(user.user.status==='admin')
                    isAdmin = true;
            }
        }

        if(isAdmin){//if request from admin user or super admin will return token for user with id of request id
            const res_user = await user_obj.show(parseInt(req.params.id));
            const res_token = jwt.sign({ user: res_user }, secret);
            res.status(200).json(res_token);
        }else
            res.status(400).json('not allowed'); //else return not allowed        
        
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

function mainRoutes(app: Application) {
    app.post('/auth/login', login);
    app.post('/auth/forget_password', forget_password);
    app.post('/auth/reset_password', reset_password);
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.get('/users/:id/get_token', get_token);
    app.patch('/users/:id', update);
    app.delete('/users/:id', delete_);
}

export default mainRoutes;
