
//return the data filtered by name if contains
function isTrue(name:string, filter_name:string){
    if(name!=null){
        name = name.toLowerCase();        
        filter_name = filter_name.toLowerCase();

        if(name.includes(filter_name))
            return true;
    }else
        throw new Error('please enter the name of product...');

    return false;
}

export default isTrue;