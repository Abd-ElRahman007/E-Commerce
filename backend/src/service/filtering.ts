
//return the data filtered by name if contains
function isTrue(name:string, filter_name:string){
    //console.log(name);
    
    if(name!=null){
        name = name.toLowerCase();        
        filter_name = filter_name.toLowerCase();

        if(name.includes(filter_name))
            return true;
    }
    return false;
}

export default isTrue;