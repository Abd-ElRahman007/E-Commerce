import supertest from 'supertest';
import route from '../../index';
import { product } from '../../models/products';
import { Catogery, catogery } from '../../models/catogery';
import { Brand, brand } from '../../models/brand';
import dotenv from 'dotenv';

dotenv.config();

const api = supertest(route);
const {admin_email,admin_password} = process.env;

const b_obj = new Brand();
const c_obj = new Catogery();

const b:brand ={
    name: 'sd'
};
const c:catogery ={
    name: 'sdcd'
};
const d ={ name: 'marwan', vote_total:2, vote_count:5, price: 5, code: ',mkl',image: 'jgvgcf', category_id: 1, currency: 'egp',stock: 0,brand_id: 1,admin_password:admin_password,admin_email:admin_email };
let res_product:product, res_cat:catogery, res_brand:brand;

describe('products handlars api test',()=>{

    it('products index route',async ()=>{
        res_brand = await b_obj.create(b);
        res_cat = await c_obj.create(c);
        const res = await api.get('/products');
        expect(res.status).toBe(200);
    });

    //name, price, catogery
    it('products create route',async ()=>{
       
        d.brand_id = Number(res_brand.id);
        d.category_id = Number(res_cat.id);
        const res = await api.post('/products').send(d);
        res_product = res.body;
        expect(res.status).toBe(200);
    });

    it('products show route',async ()=>{
        
        const res = await api.get(`/products/${res_product.id}`);
        expect(res.status).toBe(200);
    });
    
    //name, price category
    it('products update route',async ()=>{
        const res = await api.patch(`/products/${res_product.id}`).send(d);
        expect(res.status).toBe(200);
    });

    it('products delete route',async ()=>{
        const res = await api.delete(`/products/${res_product.id}`).send(d);
        expect(res.status).toBe(200);
        
    });
});