// import {User,user} from '../../models/users';

// const user_ = new User();

// describe('Tests for User model', ()=>{
    
//     //index function
//     it('test index to be define',()=>{
//         expect(user_.index).toBeDefined();
//     });
//     it('test index to equal',async()=>{
//         const res = await user_.index();                
//         expect(res.length).toEqual(1);
//     });
//     //create function
//     it('test create to be define',()=>{
//         expect(user_.create).toBeDefined();
//     });
//     it('test create to equal',async()=>{
//         const u:user={
//             id: 3,
//             f_name: '21',
//             l_name: '50',
//             password: 'marwan',
//             email: '',
//             status: ''
//         };
//         const res = await user_.create(u);  
//         expect(res.f_name).toEqual('21');
//     });
//     //show function
//     it('test show to be define',()=>{
//         expect(user_.show).toBeDefined();
//     });
//     it('test show to equal',async()=>{        
//         const res = await user_.show(1);
//         expect(res.password).toEqual('mar');
//     });
//     //auth function
//     it('test auth to define',()=>{
//         expect(user_.auth).toBeDefined();
//     });
//     it('test auth to equal',async()=>{
        
//         const res = await user_.auth('marwanl@gmail.com','mar');
//         expect(res?.password).toEqual('mar');
//     });

//     //update function
//     it('test update to define',()=>{
//         expect(user_.update).toBeDefined();
//     });
//     it('test update to equal',async()=>{
//         const u:user={
//             id: 1,
//             f_name: '100',
//             l_name: '50',
//             password: 'marwan',
//             email: 'lkm',
//             status: ''
//         };
//         const res=await user_.update(u);
//         expect(res.f_name).toEqual('100');
//     });
    
//     //delete function
//     it('test delete to be define',()=>{
//         expect(user_.delete).toBeDefined();
//     });

//     it('test delete to equal',async()=>{
//         const res = await user_.delete(1);
//         expect(res).toEqual('deleted');
//     });
    
    
// });