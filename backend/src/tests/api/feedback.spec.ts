import supertest from 'supertest';
import route from '../../index';
import { User, user } from '../../models/users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Product, product } from '../../models/products';
import { Catogery,catogery } from '../../models/catogery';
import { Brand,brand } from '../../models/brand';
import { comment } from '../../models/feedback';

dotenv.config();

const {admin_email,admin_password} = process.env;
const secret = process.env.token;
const api = supertest(route);
const user_obj = new User();
const product_obj = new Product();
const catogery_obj = new Catogery();
const brand_obj = new Brand();

const u:user= {
    f_name: 'maro',
    l_name: 'nnn',
    password: '$2b$05$N3b8OrzeaE2E/Kwqu1PCH.Zdy9wNEwPUD3TY9RtZXZX6gGjATSYUu',
    email: 'mmdewwx@gmail.com',
    status: 'admin'
};
const p:product = {
    code: 'jhhj',
    name: 'kfdl',
    image: 'hjhjgv',
    category_id: 0,
    price: 0,
    currency: 'egp',
    stock: 0,
    brand_id: 0
};
const comm:comment = {
    message: 'sdfier',
    vote:0
};
const b:brand = {
    name: 'jdskdwi'
};
const c:catogery = {
    name: 'slkdfie'
};
let res_user:user, res_brand:brand, res_cat:catogery, res_p:product, res_com:comment, token:string;

describe('feedback handlars api test',()=>{

    it('index route',async ()=>{
        res_brand = await brand_obj.create(b);
        res_cat = await catogery_obj.create(c);
        p.brand_id = Number(res_brand.id);
        p.category_id = Number(res_cat.id);
        res_p = await product_obj.create(p);
        res_user = await user_obj.create(u);
        const res = await api.get(`/products/${res_p.id}/comments`);
        expect(res.status).toBe(200);
    });

    it('create route',async ()=>{
        token = jwt.sign({user:res_user},secret as unknown as string);
        const res = await api.post(`/products/${res_p.id}/comments`).send(comm).set({'token':token});
        res_com = res.body;
        expect(res.status).toBe(200);
    });

    it('show route',async ()=>{
        
        const res = await api.get(`/products/${res_p.id}/comments/${res_com.id}`);
        expect(res.status).toBe(200);
    });

    it('update route',async ()=>{
        //comm.id=res_com.id;
        const res = await api.patch(`/products/${res_p.id}/comments/${res_com.id}`).send(comm).set({'token':token});
        expect(res.status).toBe(200);
    });

    it('delete route',async ()=>{
        const res = await api.delete(`/products/${res_p.id}/comments/${res_com.id}`).set({'token':token});
        expect(res.status).toBe(200); 
        
    });
 
});