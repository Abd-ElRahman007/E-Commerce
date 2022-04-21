import {User,user} from '../../models/users';

const user_ = new User();
let us:user;
describe('Tests for User model', ()=>{
    
    //index function
    it('test index to be define',()=>{
        expect(user_.index).toBeDefined();
    });
    it('test index to equal',async()=>{
        const res = await user_.index();                
        expect(res).not.toThrowError;

    });
    //create function
    it('test create to be define',()=>{
        expect(user_.create).toBeDefined();
    });
    it('test create to equal',async()=>{
        const u:user={
            f_name: '21',
            l_name: '50',
            password: 'marwajhhn12345',
            email: 'mjhj@gmail.com',
            status: 'active'
        };
        us = await user_.create(u);  
        
        expect(us).not.toThrowError;

    });
    //show function
    it('test show to be define',()=>{
        expect(user_.show).toBeDefined();
    });
    it('test show to equal',async()=>{        
        const res = await user_.show(us.id as unknown as number);
        expect(res).not.toThrowError;

    });
    //auth function
    it('test auth to define',()=>{
        expect(user_.auth).toBeDefined();
    });
    it('test auth to equal',async()=>{
        const res = await user_.auth('marwan401@gmail.com','mar');
        expect(res).not.toThrowError;
        
    });

    //update function
    it('test update to define',()=>{
        expect(user_.update).toBeDefined();
    });
    it('test update to equal',async()=>{
        const u:user={
            id:Number(us.id),
            f_name: '100',
            l_name: '50',
            password: 'marwajhhn12345',
            email: 'mjhj@gmail.com',
            status: 'active'
        };
        const res=await user_.update(u);
        expect(res).not.toThrowError;

    });
    
    //delete function
    it('test delete to be define',()=>{
        expect(user_.delete).toBeDefined();
    });

    it('test delete to equal',async()=>{
        const res = await user_.delete(us.id as unknown as number);
        expect(res).not.toThrowError;

    });
    
    
});