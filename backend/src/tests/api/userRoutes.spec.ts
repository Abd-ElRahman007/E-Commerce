import supertest from 'supertest';
import route from '../../index';
import { User, user } from '../../models/users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const {admin_email,admin_password} = process.env;
const secret = process.env.token;
const user_ = new User();
const api = supertest(route);
let res_user:user, token:string;


const us:user = {
    email: 'kjjsdbsd@gmail.com',
    password: 'marwandjdks',
    status: 'active'
};

describe('users handlars api test',()=>{

    it('users index route',async ()=>{
        
        const res = await api.get('/users');
        expect(res.status).toBe(200);
    });
    it('users create route',async ()=>{
            
        const res = await api.post('/users').send(us);
        token = res.body.token;
        res_user = res.body.user;
        expect(res.status).toBe(200);
    });

    it('users show route',async ()=>{
        
        const res = await api.get(`/users/${Number(res_user.id)}`).set({token});
        expect(res.status).toBe(200);
    });

    

    it('users update route',async ()=>{
        
        const res = await api.patch(`/users/${res_user.id}`).send(us).set({'token':token});
        expect(res.status).toBe(200);
    });

    it('users login route',async ()=>{
       
        const res = await api.post('/auth/login').send({'email':us.email, 'password':us.password});
        expect(res.status).toBe(200);
    });

    it('users get token route',async ()=>{
        const res = await api.get(`/users/${res_user.id}/get_token`).set({admin_email,admin_password});
        expect(res.status).toBe(200); 
        
    });

    it('users delete route',async ()=>{
        const res = await api.delete(`/users/${res_user.id}`).set({'token':token});
        expect(res.status).toBe(200); 
        
    });

});