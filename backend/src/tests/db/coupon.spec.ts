import {Coupon,coupon} from '../../models/coupon';

const coupon_ = new Coupon();


describe('Tests for Brand model', ()=>{
    
    
    //index function
    it('test index to be define',()=>{
        expect(coupon_.index).toBeDefined();
    });
    it('test index to equal',async()=>{
        const res = await coupon_.index();
        
        expect(res.length).toEqual(0);
    });

    //create function
    it('test create to be define',()=>{
        expect(coupon_.create).toBeDefined();
    });
    it('test create to equal',async()=>{
        const c:coupon={
            code:'sdjk',
            value_of_100:20
        };
        const res = await coupon_.create(c);  
        expect(res.code).toEqual('sdjk');
    });

    //show function
    it('test show to be define',()=>{
        expect(coupon_.show).toBeDefined();
    });
    it('test show to equal',async()=>{        
        const res = await coupon_.show(1);
        expect(res.value_of_100).toEqual(20);
    });

    //update function
    it('test update to define',()=>{
        expect(coupon_.update).toBeDefined();
    });
    it('test update to equal',async()=>{
        const c:coupon={
            id:1,
            code:'dss',
            value_of_100:50
        };
        const res=await coupon_.update(c);
        expect(res.value_of_100).toEqual(50);
    });

    //delete function
    it('test delete to be define',()=>{
        expect(coupon_.delete).toBeDefined();
    });

    it('test delete to equal',async()=>{
        const res = await coupon_.delete(1);
        expect(res).toEqual('deleted');
    });
    
    
});