import supertest from 'supertest';
import route from '../../index';
import { catogery } from '../../models/catogery';
import dotenv from 'dotenv';

dotenv.config();

const {admin_email,admin_password} = process.env;

const api = supertest(route);

const c = {name:'kfds',admin_email:admin_email,admin_password:admin_password};
let res_cat:catogery;

describe('Catogery handlars api test',()=>{

    it('Catogery index route',async ()=>{
        
        const res = await api.get('/categories');
        expect(res.status).toBe(200);
    });

    it('Catogery create route',async ()=>{
        
        const res = await api.post('/categories').send(c);
        res_cat = res.body;
        expect(res.status).toBe(200);
    });

    it('Catogery show route',async ()=>{
        
        const res = await api.get(`/categories/${res_cat.id}`).send(c);
        expect(res.status).toBe(200);
    });

    it('Catogery update route',async ()=>{
        
        const res = await api.patch(`/categories/${res_cat.id}`).send(c);
        expect(res.status).toBe(200);
    });

    
    

    it('Catogery delete route',async ()=>{
        const res = await api.delete(`/categories/${res_cat.id}`).send(c);
        expect(res.status).toBe(200); 
        
    });

});