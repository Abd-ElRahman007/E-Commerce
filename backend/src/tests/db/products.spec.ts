// import {Product,product} from '../../models/products';

// const product_ = new Product();

// const p:product={
//     code: 'mm11',
//     name: '',
//     image: '',
//     category_id: 2,
//     price: 0,
//     currency: '',
//     stock: 0,
//     brand_id: 2
// };

// describe('Tests for Product model', ()=>{

//     //index function
//     it('test index be define',()=>{
//         expect(product_.index).toBeDefined();
//     });
//     it('test index to equal',async()=>{
//         const res = await product_.index();
//         expect(res.length).toEqual(1);
//     });

//     //create function
//     it('test create be define',()=>{
//         expect(product_.create).toBeDefined();
//     });
//     it('test create to equal',async()=>{
//         const res = await product_.create(p);
//         expect(res.code).toEqual('mm11');
//     });

//     //show function
//     it('test show be define',()=>{
//         expect(product_.show).toBeDefined();
//     });
//     it('test show to equal',async()=>{
//         const res = await product_.show(1);
        
//         expect(res.code).toEqual('maom');
//     });
//     //update function
//     it('test update be define',()=>{
//         expect(product_.update).toBeDefined();
//     });
//     it('test update to equal',async()=>{
//         const p_:product={
//             id: 1,
//             code: 'string',
//             name: 'string',
//             model: 'string',
//             image: 'string',
//             description: 'string',
//             category_id: 2,
//             price: 1,
//             currency: 'string',
//             vote_count: 20,
//             vote_total: 20,
//             stock: 20,
//             brand_id: 2,
//         };
//         const res = await product_.update(p_);
//         expect(res.code).toEqual('string');
//     });
//     //delete function
//     it('test delete be define',()=>{
//         expect(product_.delete).toBeDefined();
//     });
//     it('test delete to equal',async()=>{
//         const res = await product_.delete(1);
       
//         expect(res).toEqual('deleted');
//     });
    
    
// });