import supertest from 'supertest';
import route from '../../index';
import { User, user } from '../../models/users';
import { Order, order, order_product } from '../../models/orders';
import { Product, product } from '../../models/products';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { catogery, Catogery } from '../../models/catogery';
import { brand, Brand } from '../../models/brand';

dotenv.config();
const secret:string = (process.env.token as unknown)as string;
const api = supertest(route);

const user_ = new User();
const order_ = new Order();
const product_ = new Product();
const category_ = new Catogery();
const brand_ = new Brand();

const u:user = {
    email: 'slkdf@gmail.com',
    password: 'jfndsjk',
    status: 'admin'
};
const o:order = {
    status: 'pendding',
    total: 0,
    time_arrival: new Date(),
    shipping_cost: 0,
    shipping_address: 'fsre',
    taxes: 0,
    payment: 'online'
};
const op:order_product = {
    product_id: 0,
    quantity: 5
};
const p:product = {
    code: 'hjbjhk',
    name: 'kfdl',
    image: 'hjhjgv',
    category_id: 0,
    price: 0,
    currency: 'egp',
    stock: 50,
    brand_id: 0
};

const b:brand = {
    name: '84jkbjh'
};
const c:catogery = {
    name: 'slk59ie'
};
let res_user:user, res_p:product, res_order:order,token:string;
describe('orders handlars api test',()=>{

    it('orders index route',async ()=>{
        const cat = await category_.create(c);
        const bra = await brand_.create(b);
        p.brand_id = Number(bra.id);
        p.category_id = Number(cat.id);
        res_p = await product_.create(p);
        res_user = await user_.create(u);
        token = jwt.sign({user:res_user},secret);

        const res = await api.get(`/users/${res_user.id}/orders`).set({token});
        expect(res.status).toBe(200);
    });

    it('orders create route',async ()=>{
        op.product_id = Number(res_p.id);
        o.status = 'pendding';
        const res = await api.post(`/users/${res_user.id}/orders`).send({order:o,products:[op]}).set({token});
        res_order = res.body;
        expect(res.status).toBe(200);
    });

    it('orders show route',async ()=>{
        
        const res = await api.get(`/users/${res_user.id}/orders/${res_order.id}`).set({token});
        
        expect(res.status).toBe(200);
    });
    
    it('orders update route',async ()=>{
        
        const res = await api.patch(`/users/${res_user.id}/orders/${res_order.id}`).send({order:o,products:[op]}).set({token});
        expect(res.status).toBe(200);
    });

    it('oreders delete route',async ()=>{
        const res = await api.delete(`/users/${res_user.id}/orders/${res_order.id}`).set({token});
        expect(res.status).toBe(200);
        
    }); 
});
