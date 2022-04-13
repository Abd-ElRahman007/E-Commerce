import {Catogery,catogery} from '../../models/catogery';

const category_ = new Catogery();


describe('Tests for Brand model', ()=>{
    
    
    //index function
    it('test index to be define',()=>{
        expect(category_.index).toBeDefined();
    });
    it('test index to equal',async()=>{
        const res = await category_.index();
        
        expect(res.length).toEqual(0);
    });

    //create function
    it('test create to be define',()=>{
        expect(category_.create).toBeDefined();
    });
    it('test create to equal',async()=>{
        const c:catogery={
            name:'21'
        };
        const res = await category_.create(c);  
        expect(res.name).toEqual('21');
    });

    //show function
    it('test show to be define',()=>{
        expect(category_.show).toBeDefined();
    });
    it('test show to equal',async()=>{        
        const res = await category_.show(1);
        expect(res.name).toEqual('21');
    });

    //update function
    it('test update to define',()=>{
        expect(category_.update).toBeDefined();
    });
    it('test update to equal',async()=>{
        const c:catogery={
            id:1,
            name:'100'
        };
        const res=await category_.update(c);
        expect(res.name).toEqual('100');
    });

    //delete function
    it('test delete to be define',()=>{
        expect(category_.delete).toBeDefined();
    });

    it('test delete to equal',async()=>{
        const res = await category_.delete(1);
        expect(res).toEqual('deleted');
    });
    
    
});