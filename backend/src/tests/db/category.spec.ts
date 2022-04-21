import {Catogery,catogery} from '../../models/catogery';

const category_ = new Catogery();

let id:number;
describe('Tests for Category model', ()=>{
    
    
    //index function
    it('test index to be define',()=>{
        expect(category_.index).toBeDefined();
    });
    it('test index to equal',async()=>{
        const res = await category_.index();
        expect(res).not.toThrowError;

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
        id = Number(res.id);
        expect(res).not.toThrowError;

    });

    //show function
    it('test show to be define',()=>{
        expect(category_.show).toBeDefined();
    });
    it('test show to equal',async()=>{        
        const res = await category_.show(id);
        expect(res).not.toThrowError;

    });

    //update function
    it('test update to define',()=>{
        expect(category_.update).toBeDefined();
    });
    it('test update to equal',async()=>{
        const c:catogery={
            id:id,
            name:'100'
        };
        const res=await category_.update(c);
        expect(res).not.toThrowError;

    });

    //delete function
    it('test delete to be define',()=>{
        expect(category_.delete).toBeDefined();
    });

    it('test delete to equal',async()=>{
        const res = await category_.delete(id);
        expect(res).not.toThrowError;

    });
    
    
});