import supertest from 'supertest';
import route from '../../index';
import { Coupon, coupon } from '../../models/coupon';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const {secret,admin_email,admin_password} = process.env;

const cop_ = new Coupon();
const api = supertest(route);
let token:string;

describe('Coupon handlars api test',()=>{

    it('Coupon index route',async ()=>{
        
        const res = await api.get('/coupons').send({'admin_password':admin_password,'admin_email':admin_email});
        expect(res.status).toBe(200);
    });

    it('Coupon show route',async ()=>{
        
        const res = await api.get('/coupons/1').send({'admin_password':admin_password,'admin_email':admin_email});
        expect(res.status).toBe(200);
    });

    it('Coupon create route',async ()=>{
        const u:coupon= {
            id: 1,
            code: 'nnew',
            value_of_100:25
        };
        const res = await api.post('/coupons').send(u).send({'admin_password':admin_password,'admin_email':admin_email});
        
        expect(res.status).toBe(200);
    });

    it('Coupon update route',async ()=>{
        const u:coupon= {
            id: 1,
            code: 'nnew',
            value_of_100:22
        };
        const res = await api.patch('/coupons/1').send(u).send({'admin_password':admin_password,'admin_email':admin_email});
        expect(res.status).toBe(200);
    });

    
    

    it('Coupon delete route',async ()=>{
        const res = await api.delete('/coupons/1').send({'admin_password':admin_password,'admin_email':admin_email});
        expect(res.status).toBe(200); 
        
    });

});