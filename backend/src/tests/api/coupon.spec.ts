import supertest from 'supertest';
import route from '../../index';
import { coupon } from '../../models/coupon';
import dotenv from 'dotenv';

dotenv.config();

const {admin_email,admin_password} = process.env;

const api = supertest(route);

const c= { code: 'nnew', value_of_100:25,admin_password:admin_password,admin_email:admin_email };

let res_conpon:coupon;

describe('Coupon handlars api test',()=>{

    it('Coupon index route',async ()=>{
        
        const res = await api.get('/coupons');
        expect(res.status).toBe(200);
    });

    it('Coupon create route',async ()=>{
        const res = await api.post('/coupons').send(c);
        res_conpon = res.body;
        expect(res.status).toBe(200);
    });

    it('Coupon show route',async ()=>{
        
        const res = await api.get(`/coupons/${res_conpon.id}`).send(c);
        expect(res.status).toBe(200);
    });

    it('Coupon update route',async ()=>{
        
        const res = await api.patch(`/coupons/${res_conpon.id}`).send(c);
        expect(res.status).toBe(200);
    });

    
    

    it('Coupon delete route',async ()=>{
        const res = await api.delete(`/coupons/${res_conpon.id}`).send(c);
        expect(res.status).toBe(200); 
        
    });

});