import supertest from 'supertest';
import route from '../../index';
import { Brand, brand } from '../../models/brand';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const {secret,admin_email,admin_password} = process.env;

const brand_ = new Brand();
const api = supertest(route);
let token:string;

describe('Brand handlars api test',()=>{

    it('Brand index route',async ()=>{
       
        const res = await api.get('/brands').send({'admin_password':admin_password,'admin_email':admin_email});
        expect(res.status).toBe(200);
    });

    it('Brand show route',async ()=>{
        
        const res = await api.get('/brands/1').send({'admin_password':admin_password,'admin_email':admin_email});
        expect(res.status).toBe(200);
    });

    it('Brand create route',async ()=>{
        
        const d:brand={
            'name':'marwan',
            'description':'ahmed'
        };
        const res = await api.post('/brands').send(d);
        expect(res.status).toBe(200);
    });

    it('Brand update route',async ()=>{
        const d:brand={
            'name':'marwan',
            'description':'ahmed'
        };
        const res = await api.patch('/brands/1').send(d).send({'admin_password':admin_password,'admin_email':admin_email});
        expect(res.status).toBe(200);
    });


    it('Brand delete route',async ()=>{
        const res = await api.delete('/brands/1').send({'admin_password':admin_password,'admin_email':admin_email});
        expect(res.status).toBe(200); 
        
    });

});