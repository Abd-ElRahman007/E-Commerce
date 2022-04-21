import supertest from 'supertest';
import route from '../../index';
import { brand } from '../../models/brand';

import dotenv from 'dotenv';

dotenv.config();

const {admin_email,admin_password} = process.env;

const api = supertest(route);

const b:brand = {
    name:'kfds',
    description:'',
};
let res_brand:brand;
describe('Brand handlars api test',()=>{

    it('Brand index route',async ()=>{
       
        const res = await api.get('/brands');
        expect(res.status).toBe(200);
    });

    it('Brand create route',async ()=>{
        
        const res = await api.post('/brands').send(b);
        res_brand = res.body;
        expect(res.status).toBe(200);
    });

    it('Brand show route',async ()=>{
        
        const res = await api.get(`/brands/${res_brand.id}`);
        expect(res.status).toBe(200);
    });

    it('Brand update route',async ()=>{
        
        const res = await api.patch(`/brands/${res_brand.id}`).send({'name':'marwan', 'description':'ahmed','admin_password':admin_password,'admin_email':admin_email});
        expect(res.status).toBe(200);
    });


    it('Brand delete route',async ()=>{
        const res = await api.delete(`/brands/${res_brand.id}`).send({'admin_password':admin_password,'admin_email':admin_email});
        expect(res.status).toBe(200); 
        
    });
 
});