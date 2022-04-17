import { Catogery , catogery} from '../../models/catogery';
import {Product,product} from '../../models/products';
import {User,user} from '../../models/users';
import { Brand, brand } from '../../models/brand';

const user_ = new User();
const brand_ = new Brand();
const category_ = new Catogery();

const product_ = new Product();


const b:brand = {
    name: 'kkl'
};
const p:product ={
    code: 'maom',
    name: '',
    image: '',
    category_id: 1,
    price: 0,
    currency: '',
    stock: 0,
    brand_id: 1
};
const c:catogery ={
    name: 'mmm'
};
let res_user:user, res_product:product,res_category:catogery, res_brand:brand, id:number;

describe('Tests for Product model', ()=>{

    //index function
    it('test index be define',()=>{
        expect(product_.index).toBeDefined();
    });
    it('test index to equal',async()=>{
        
        const res = await product_.index();
        expect(res).not.toThrowError;

    });

    //create function
    it('test create be define',()=>{
        expect(product_.create).toBeDefined();
    });
    it('test create to equal',async()=>{
        res_category = await category_.create(c);
        res_brand = await brand_.create(b);
        p.category_id = res_category.id as number;
        p.brand_id = res_brand.id as number;
        res_product = await product_.create(p);
        
        expect(res_product).not.toThrowError;

    });

    //show function
    it('test show be define',()=>{
        expect(product_.show).toBeDefined();
    });
    it('test show to equal',async()=>{
        const res = await product_.show(Number(res_product.id));
        
        expect(res).not.toThrowError;

    });
    //update function
    it('test update be define',()=>{
        expect(product_.update).toBeDefined();
    });
    it('test update to equal',async()=>{
        const p_:product={
            code: 'string',
            name: 'string',
            model: 'string',
            image: 'string',
            description: 'string',
            category_id: Number(res_category.id),
            price: 0,
            currency: 'eg',
            stock: 0,
            brand_id: Number(res_brand.id)
        };
        const res = await product_.update(p_);
        expect(res).not.toThrowError;

    });
    //delete function
    it('test delete be define',()=>{
        expect(product_.delete).toBeDefined();
    });
    it('test delete to equal',async()=>{
        const res = await product_.delete(res_product.id as unknown as number);
       
        expect(res).not.toThrowError;
    
    });
    
    
});