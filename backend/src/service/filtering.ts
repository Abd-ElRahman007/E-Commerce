

function isTrue(name:string, filter_name:string){
    if(name){
        name = name.toLowerCase();        
        filter_name = filter_name.toLowerCase();

        if(name.includes(filter_name))
            return true;
    }
    return false;
}

export default isTrue;