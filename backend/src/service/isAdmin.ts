import dotenv from 'dotenv';
import parseJwt from './jwtParsing';
import jwt from 'jsonwebtoken';

dotenv.config();
const {secret,admin_email, admin_password} = process.env;


function isAdmin(email:string, password:string, token:string):boolean{
   
    if(email == admin_email && password == admin_password){
        return true;
    }
    if(token){//if token exist make sure that the token for an admin user
        const user = parseJwt(token);
        const permession = jwt.verify(token, secret as string);

        if(permession && user.user.status =='admin'){
            return true;
        }
    }
    return false;
}

export default isAdmin;