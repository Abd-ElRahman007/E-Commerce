// import { Catogery , catogery} from '../../models/catogery';
// import {Comment,comment} from '../../models/feedback';
// import {Product,product} from '../../models/products';
// import {User,user} from '../../models/users';
// import { Brand, brand } from '../../models/brand';
// const comment_ = new Comment();
// const product_ = new Product();
// const user_ = new User();
// const brand_ = new Brand();
// const category_ = new Catogery();

// const u:user ={
//     email: 'marwanl@gmail.com',
//     password: 'mar',
//     status: ''
// };
// const b:brand = {
//     name: 'kkl'
// };
// const p:product ={
//     code: 'maom',
//     name: '',
//     image: '',
//     category_id: 1,
//     price: 0,
//     currency: '',
//     stock: 0,
//     brand_id: 1
// };
// const c:catogery ={
//     name: 'mmm'
// };

// let res_user:user, res_product:product,res_category:catogery, res_brand:brand;

// describe('Tests for Feedback model', ()=>{
    
//     //index function
//     it('test index to be define',()=>{
//         expect(comment_.index).toBeDefined();
//     });
//     it('test index to equal',async()=>{
//         res_category = await category_.create(c);
//         res_brand = await brand_.create(b);
//         p.category_id = res_category.id as number;
//         p.brand_id = res_brand.id as number;
//         res_product = await product_.create(p);
//         res_user = await user_.create(u);

//         const res = await comment_.index(res_product.id as unknown as number);
        
//         expect(res.length).toEqual(0);
//     });

//     //create function
//     it('test create to be define',()=>{
//         expect(comment_.create).toBeDefined();
//     });
//     it('test create to equal',async()=>{
//         const c:comment={
//             message:'sdjk',
//             user_id:res_user.id as number,
//             product_id:res_product.id as number
//         };
//         const res = await comment_.create(c);  
//         expect(res.message).toEqual('sdjk');
//     });

//     //show function
//     it('test show to be define',()=>{
//         expect(comment_.show).toBeDefined();
//     });
//     it('test show to equal',async()=>{        
//         const res = await comment_.show(res_product.id as number,1);
//         expect(res.id).toEqual(1);
//     });

//     //update function
//     it('test update to define',()=>{
//         expect(comment_.update).toBeDefined();
//     });
//     it('test update to equal',async()=>{
//         const c:comment={
//             id: 1,
//             message: 'sd44jk',
//             user_id: res_user.id as number,
//             product_id: res_product.id as number
//         };
//         const res=await comment_.update(c);
//         expect(res.message).toEqual('sd44jk');
//     });

//     //delete function
//     it('test delete to be define',()=>{
//         expect(comment_.delete).toBeDefined();
//     });

//     it('test delete to equal',async()=>{
//         const res = await comment_.delete(res_product.id as number,1);
        
//         expect(res).toEqual('deleted');
        
//     });
    
    
// });