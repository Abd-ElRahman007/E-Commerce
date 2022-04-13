import {Comment,comment} from '../../models/feedback';
import {Product,product} from '../../models/products';
import {User,user} from '../../models/users';

const comment_ = new Comment();
const product_ = new Product();
const user_ = new User();

describe('Tests for Brand model', ()=>{
    
    
    //index function
    it('test index to be define',()=>{
        expect(comment_.index).toBeDefined();
    });
    it('test index to equal',async()=>{

        


        const u:user ={
            email:'marwanl@gmail.com',
            password:'mar'
        };
        const res_user = await user_.create(u);

        const p:product ={
            code:'maom',
            category_id:1,
            brand_id:1
        };
        const res_product = await product_.create(p);

        console.log(await product_.index());

        const res = await comment_.index(res_product.id as unknown as number);
        
        expect(res.length).toEqual(0);
    });

    //create function
    it('test create to be define',()=>{
        expect(comment_.create).toBeDefined();
    });
    it('test create to equal',async()=>{
        const c:comment={
            message:'sdjk',
            user_id:1,
            product_id:1
        };
        const res = await comment_.create(c);  
        expect(res.message).toEqual('sdjk');
    });

    //show function
    it('test show to be define',()=>{
        expect(comment_.show).toBeDefined();
    });
    it('test show to equal',async()=>{        
        const res = await comment_.show(1,1);
        expect(res.id).toEqual(1);
    });

    //update function
    it('test update to define',()=>{
        expect(comment_.update).toBeDefined();
    });
    it('test update to equal',async()=>{
        const c:comment={
            id:1,
            message:'sd44jk',
            user_id:1,
            product_id:1
        };
        const res=await comment_.update(c);
        expect(res.message).toEqual('sd44jk');
    });

    //delete function
    it('test delete to be define',()=>{
        expect(comment_.delete).toBeDefined();
    });

    it('test delete to equal',async()=>{
        const res = await comment_.delete(1,1,1);
        expect(res).toEqual('deleted');
    });
    
    
});