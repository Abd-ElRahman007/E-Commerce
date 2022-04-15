import supertest from 'supertest';
import route from '../../index';
import { Catogery, catogery } from '../../models/catogery';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const {secret,admin_email,admin_password} = process.env;

const cat_ = new Catogery();
const api = supertest(route);
let token:string;

describe('Catogery handlars api test',()=>{

    it('Catogery index route',async ()=>{
        
        const res = await api.get('/categories').send({'admin_password':admin_password,'admin_email':admin_email});
        expect(res.status).toBe(200);
    });

    it('Catogery show route',async ()=>{
        
        const res = await api.get('/categories/1').send({'admin_password':admin_password,'admin_email':admin_email});
        expect(res.status).toBe(200);
    });

    it('Catogery create route',async ()=>{
        const u:catogery= {
            id: 1,
            name: 'nnew'
        };
        const res = await api.post('/categories').send(u).send({'admin_password':admin_password,'admin_email':admin_email});
        
        expect(res.status).toBe(200);
    });

    it('Catogery update route',async ()=>{
        const u:catogery= {
            id: 1,
            name: 'nnenw'
        };
        const res = await api.patch('/categories/1').send(u).send({'admin_password':admin_password,'admin_email':admin_email});
        expect(res.status).toBe(200);
    });

    
    

    it('Catogery delete route',async ()=>{
        const res = await api.delete('/categories/1').send({'admin_password':admin_password,'admin_email':admin_email});
        expect(res.status).toBe(200); 
        
    });

});