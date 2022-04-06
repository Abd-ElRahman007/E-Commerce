import { Application, Response, Request } from 'express';
import nodemailer from 'nodemailer';
import { User, user } from '../models/users';
import parseJwt from '../service/jwtParsing';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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
        if (permession) {
            try {
                const resault = await user_obj.show(parseInt(user.user.id));
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
        const user = parseJwt(token);

        if (permession) {
            try {
                const u: user = {
                    id: user.user.id as number,
                    f_name:req.body.f_name, 
                    l_name:req.body.l_name, 
                    email:req.body.email, 
                    password:'', 
                    birthday:req.body.birthday, 
                    phone:req.body.phone, 
                    status:'', 
                    city:req.body.city,
                    address:req.body.address,
                    coupon_id:req.body.coupon_id
                };
                //if the user is a super admin then he can change ststus of user to [active,disactive,suspended,admin]
                if(req.body.admin_email==process.env.admin_email && req.body.admin_password==process.env.admin_password){
                    u.status=req.body.status;
                }
                const resault = await user_obj.update(u);
                const newToken = jwt.sign({ user: resault }, secret);
                res.status(200).json({resault,newToken});
            } catch (e) {
                res.status(400).json(`${e}`);
            }
        } else res.send('Not allowed login first!!');
    } catch (e) {
        res.status(400).send(`${e}`);
    }
}

async function create(req: Request, res: Response) {
    try {
        
        const hash = bcrypt.hashSync(
            req.body.password + process.env.extra,
            parseInt(process.env.round as string)
        );
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
        if(req.body.admin_email==process.env.admin_email && req.body.admin_password==process.env.admin_password){
            u.status=req.body.status;
        }
        const resault = await user_obj.create(u);
        const token = jwt.sign({ user: resault }, secret);
        // sending mail token
        // const mailOptions = { 
        //     from: 'marwan4125882@gmail.com', 
        //     to: 'marwan4125881@gmail.com.com',
        //     subject: 'Email confirm',
        //     text: `${token}`
        // };
        
        // transporter.sendMail(mailOptions, function(error, info)
        // {
        //     if (error) 
        //     { 
        //         console.log(error);
        //     } else {
            
        //         console.log('Email sent: ' + info.response);
        //     }});
        //////////////////////////////////////////////////
        res.status(200).json(token);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

async function delete_(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    const user = parseJwt(token);

    const permession = jwt.verify(token, secret);
    if (permession) {
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
        const token = req.headers.token as unknown as string;
        const permession = jwt.verify(token,secret);
        const user = parseJwt(token);
        const resault = await user_obj.auth(email, password);

        if(permession && user.user.status!='suspended'){
            res.status(200).json({token:token});
        }else if(resault){
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
