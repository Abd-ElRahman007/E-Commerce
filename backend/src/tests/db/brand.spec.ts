import {Brand,brand} from '../../models/brand';

const brand_ = new Brand();


describe('Tests for Brand model', ()=>{
    
    
    //index function
    it('test index to be define',()=>{
        expect(brand_.index).toBeDefined();
    });
    it('test index to equal',async()=>{
        const res = await brand_.index();
        
        expect(res.length).toEqual(0);
    });

    //create function
    it('test create to be define',()=>{
        expect(brand_.create).toBeDefined();
    });
    it('test create to equal',async()=>{
        const b:brand={
            name:'21',
            description:'50'
        };
        const res = await brand_.create(b);  
        expect(res.name).toEqual('21');
    });

    //show function
    it('test show to be define',()=>{
        expect(brand_.show).toBeDefined();
    });
    it('test show to equal',async()=>{        
        const res = await brand_.show(1);
        expect(res.name).toEqual('21');
    });

    //update function
    it('test update to define',()=>{
        expect(brand_.update).toBeDefined();
    });
    it('test update to equal',async()=>{
        const b:brand={
            id:1,
            name:'100',
            description:'50'
        };
        const res=await brand_.update(b);
        expect(res.name).toEqual('100');
    });

    //delete function
    it('test delete to be define',()=>{
        expect(brand_.delete).toBeDefined();
    });

    it('test delete to equal',async()=>{
        const res = await brand_.delete(1);
        expect(res).toEqual('deleted');
    });
    
    
});