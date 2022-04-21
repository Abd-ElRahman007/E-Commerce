import { Brand, brand } from '../../models/brand';
import { Catogery, catogery } from '../../models/catogery';
import {Order,order} from '../../models/orders';
import { Product, product } from '../../models/products';
import { User, user } from '../../models/users';


const order_ = new Order();

let order_id:number, user_id:number,product_id:number;

const product_ = new Product();
const user_ = new User();
const brand_ = new Brand();
const category_ = new Catogery();

const u:user ={
    email: 'marwan401@gmail.com',
    password: 'mar',
    status: ''
};
const b:brand = {
    name: 'kkkjdsl'
};
const p:product ={
    code: 'dsfrrgre',
    name: '',
    image: '',
    category_id: 1,
    price: 0,
    currency: '',
    stock: 0,
    brand_id: 1
};
const c:catogery ={
    name: 'msdofsmm'
};


describe('Tests for Orders model', ()=>{
    //create function
    it('test create be define',()=>{
        expect(order_.create).toBeDefined();
    });
    it('test to create to equal',async()=>{
        const res_user = await user_.create(u);
        const res_category = await category_.create(c);
        const res_brand = await brand_.create(b);
        p.category_id = res_category.id as number;
        p.brand_id = res_brand.id as number;
        const res_product = await product_.create(p);
        product_id = Number(res_product.id);
        user_id = Number(res_user.id);
        const o_:order={
            status: 'open',
            user_id: user_id,
            total: 0,
            time_arrival: new Date(),
            compelete_at: new Date(),
            shipping_cost: 0,
            shipping_address: '',
            taxes: 0,
            payment: 'online'
        };
        const res = await order_.create(o_);
        order_id = Number(res.id);
        expect(res).not.toThrowError;
    });
    //index function
    it('test index to be define',()=>{
        
        expect(order_.index).toBeDefined();
    });
    it('test index to equal',async()=>{
     
        const res = await order_.index(user_id);
        expect(res).not.toThrowError;
    });
    
    //show function
    it('test show be define',()=>{
        expect(order_.show).toBeDefined();
    });
    it('test to show to equal',async()=>{
        const res = await order_.show(order_id,user_id);
        expect(res).not.toThrowError;
    });
    //update function
    it('test update be define',()=>{
        expect(order_.update).toBeDefined();
    });
    it('test to update to equal',async()=>{
        const o_:order={
            id: order_id,
            status: 'complete',
            user_id: user_id,
            total: 0,
            time_arrival: new Date(),
            compelete_at: new Date(),
            shipping_cost: 0,
            shipping_address: '',
            taxes: 0,
            payment: ''
        };
        const res = await order_.update(o_);
        expect(res).not.toThrowError;
    });
    //add product
    it('test add product be define',()=>{
        expect(order_.addProduct).toBeDefined();
    });
    it('test add product to equal',async ()=>{   
            
        const res = await order_.addProduct(1,order_id,product_id);
        expect(res).not.toThrowError;
        
    });
    //delete function
    it('test delete be define',()=>{
        expect(order_.delete).toBeDefined();
    });
    it('test delete to equal',async()=>{
        const res = await order_.delete(order_id,user_id);

        expect(res).not.toThrowError;
    });
    
});