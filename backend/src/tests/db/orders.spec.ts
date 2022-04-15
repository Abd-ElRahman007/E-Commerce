// import {Order,order} from '../../models/orders';


// const order_ = new Order();

// describe('Tests for Orders model', ()=>{
//     //create function
//     it('test create be define',()=>{
//         expect(order_.create).toBeDefined();
//     });
//     it('test to create to equal',async()=>{
//         const o_:order={
//             status: 'open',
//             user_id: 1,
//             total: 0,
//             time_arrival: new Date(),
//             compelete_at: new Date()
//         };
//         const res = await order_.create(o_);
//         expect(res.status).toEqual('open');
//     });
//     //index function
//     it('test index to be define',()=>{
        
//         expect(order_.index).toBeDefined();
//     });
//     it('test index to equal',async()=>{
     
//         const res = await order_.index(1);
//         expect(res.length).toEqual(1);
//     });
    
//     //show function
//     it('test show be define',()=>{
//         expect(order_.show).toBeDefined();
//     });
//     it('test to show to equal',async()=>{
//         const res = await order_.show(1,1);
//         expect(res.status).toEqual('open');
//     });
//     //update function
//     it('test update be define',()=>{
//         expect(order_.update).toBeDefined();
//     });
//     it('test to update to equal',async()=>{
//         const o_:order={
//             id: 1,
//             status: 'complete',
//             user_id: 1,
//             total: 0,
//             time_arrival: new Date(),
//             compelete_at: new Date()
//         };
//         const res = await order_.update(o_);
//         expect(res.status).toEqual('complete');
//     });
//     //add product
//     it('test add product be define',()=>{
//         expect(order_.addProduct).toBeDefined();
//     });
//     it('test add product to equal',async ()=>{       
//         const res = await order_.addProduct(1,1,5);
//         expect(res).not.toThrowError;
        
//     });
//     //delete function
//     it('test delete be define',()=>{
//         expect(order_.delete).toBeDefined();
//     });
//     it('test delete to equal',async()=>{
//         const res = await order_.delete(1,1);

//         expect(res).toEqual('deleted');
//     });
    
// });