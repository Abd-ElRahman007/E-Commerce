import { Application, Response, Request } from 'express';
import nodemailer from 'nodemailer';
import { User, user } from '../models/users';
import parseJwt from '../service/jwtParsing';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import {userShema} from '../service/validation';

dotenv.config();
const secret: string = process.env.token as unknown as string;
const user_obj = new User();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'marwan4125882@gmail.com',
        pass: process.env.email_password
    }
});


async function index(req: Request, res: Response) {
    try {
        const token = req.headers.token as unknown as string;
        const permession = jwt.verify(token, secret);
        const user = parseJwt(token);

        let isSuperAdmin = false;
        if(req.body.admin_email == process.env.admin_email && req.body.admin_password == process.env.admin_password){
            isSuperAdmin=true;
        }
        
        if ((permession && user.user.status=='admin')|| isSuperAdmin) {
            try {
                const resault = await user_obj.index();
                
                res.status(200).json(resault);
            } catch (e) {
                res.status(400).json(`${e}`);
            }
        } else res.send('Not allowed for you!!');
    } catch (e) {
        res.status(400).send(`${e}`);
    }
}

async function show(req: Request, res: Response) {
    try {
        const token = req.headers.token as unknown as string;
        const permession = jwt.verify(token, secret);
        const user = parseJwt(token);

        let isSuperAdmin = false;
        if(req.body.admin_email == process.env.admin_email && req.body.admin_password == process.env.admin_password){
            isSuperAdmin=true;
        }
        let search_id:number = parseInt(user.user.id);
        if (permession || isSuperAdmin) {
            if(user.user.status=='admin'){
                search_id=Number(req.params.id);
            }
            try {
                const resault = await user_obj.show(search_id);
                res.status(200).json(resault);
            } catch (e) {
                res.status(400).json(`${e}`);
            }
        } else res.send('Not allowed login first!!');
    } catch (e) {
        res.status(400).send(`${e}`);
    }
}

async function update(req: Request, res: Response) {
    try {
        const token = req.headers.token as unknown as string;
        const permession = jwt.verify(token, secret);
        const user = parseJwt(token).user;
        const id = Number(req.params.id);
        if(permession && id==user.id){
            if(req.body.f_name)
                user.f_name=req.body.f_name;
            if(req.body.l_name)
                user.f_name=req.body.l_name;
            if(req.body.email)
                user.email=req.body.email;
            if(req.body.password)
                user.password=req.body.password;
            if(req.body.birthday)
                user.birthday=req.body.birthday;
            if(req.body.phone)
                user.phone=req.body.phone;
            if(req.body.city)
                user.city=req.body.city;
            if(req.body.address)
                user.address=req.body.address;

            const resualt = await user_obj.update(user);
            const new_token = jwt.sign({user:resualt},secret);
            res.status(200).json(new_token);
        }else if(permession && id!=user.id && user.status=='admin' && req.body.status!='admin'){
            const u:user={
                id:id,
                coupon_id:Number(req.body.coupon_id),
                status:req.body.status,
            };
            const resault = await user_obj.update(u);
            const new_token = jwt.sign({user:resault},secret);
            res.status(200).json(new_token);
        }else if(req.body.admin_email==process.env.admin_email && req.body.admin_password==process.env.admin_password){
            const u:user={
                id:id,
                coupon_id:Number(req.body.coupon_id),
                status:req.body.status,
            };
            const resault = await user_obj.update(u);
            const new_token = jwt.sign({user:resault},secret);
            res.status(200).json(new_token);
        }else
            res.status(400).json('failed');
    } catch (e) {
        res.status(400).send(`${e}`);
    }
}

async function create(req: Request, res: Response) {
    
    try {
        
        const hash = bcrypt.hashSync(req.body.password+process.env.extra, parseInt(process.env.round as string));
        const u: user = {
            f_name:req.body.f_name, 
            l_name:req.body.l_name, 
            email:req.body.email, 
            password:hash, 
            birthday:req.body.birthday, 
            phone:req.body.phone, 
            status:'active',
            city:req.body.city,
            address:req.body.address,
            coupon_id:req.body.coupon_id
        };
        const validate = userShema.validate(u);
        console.log('v...........');
        
        console.log(validate);

        console.log('v...........');

        
        const resault = await user_obj.create(u);
        const token = jwt.sign({ user: resault }, secret);
        res.status(200).json(token);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

async function delete_(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    const user = parseJwt(token);
    const id = Number(req.params.id);
    const permession = jwt.verify(token, secret);
    if (permession && user.user.id==id) {
        try {
            const resault = await user_obj.delete(parseInt(user.user.id));
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed login first!!');
}

async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const hash = bcrypt.hashSync(password+process.env.extra, parseInt(process.env.round as string));
        const resault = await user_obj.auth(email, hash);
    
        if(resault){
            if (resault.status!='suspended') {
                const user_token = jwt.sign({user:resault},secret);
                res.status(200).json(user_token);
            }else
                res.status(400).json('user suspended');
        }
        else res.status(400).send('failed');
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

async function forget_password(req: Request, res: Response) {
    try {
        const { email } = req.body;

        const resault = await user_obj.forget_password(email);
       
        if(resault){
            if (resault.status!='suspended') {
                const token = jwt.sign({ user: resault }, secret);

                //send email to result.email with new token
                const mailOptions = { 
                    from: 'marwan4125882@gmail.com', 
                    to: resault.email,
                    subject: 'Reset Password Email',
                    text: `${token}`
                };
                
                transporter.sendMail(mailOptions, function(error, info)
                {
                    if (error) 
                    { 
                        console.log(error);
                    } else {
                    
                        console.log('Email sent: ' + info.response);
                    }});
                ///////////////////////////////////////////////
                res.status(200).json('check your email.');
            }else
                res.status(400).json('user suspended');
        }
        else res.status(400).send('failed');
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}


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


async function get_token(req: Request, res: Response) {
    try {
        const resault = await user_obj.show(parseInt(req.params.id));
        const res_token = jwt.sign({ user: resault }, secret);
        const token = req.headers.token as unknown as string;
        const permession = jwt.verify(token,secret);
        const {admin_email,admin_password}=req.body;
        if(permession||(admin_email==process.env.admin_email && admin_password == process.env.admin_password)){
            res.status(200).json(res_token);
        }else
            res.status(400).json('not allowed');        
        
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
