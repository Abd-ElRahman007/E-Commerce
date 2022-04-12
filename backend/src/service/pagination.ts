import { product } from '../models/products';


function pagination(page:number ,limit:number, products:product[]){
    const start_index = (page-1)*limit;
    const end_index = (page)*limit;
    const result={next:{},data:{},previous:{}};
    if(products.length > end_index){
        result.next={page:page+1,limit:limit};
    }        

    if(start_index>0){
        result.previous={page:page-1,limit:limit};
    }
    result.data=products.slice(start_index,end_index);
    return result;
    
}

export default pagination;