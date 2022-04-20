// import { Application, Response, Request } from 'express';
// import { Order_product, order_product } from '../models/order_product';
// import isAdminFun from '../service/isAdmin';
// import { middelware } from '../service/middelware';
// import { brandSchema } from '../service/validation';





// const order_obj = new Order_product();
// //return all brands in database
// async function index(req: Request, res: Response) {
//     const order_id = req.params.order_id;
//     try {
//         const resault = await order_obj.index(order_id as unknown as number);
//         res.status(200).json(resault);
//     } catch (e) {
//         res.status(400).json(`${e}`);
//     }
// }
// //return only one brand from databse using id in request params
// async function show(req: Request, res: Response) {
//     try {
//         const resault = await order_obj.show(req.params.id as unknown as number);
//         if(resault == undefined)
//             return res.status(400).json('row not exist');
//         res.status(200).json(resault);
//     } catch (e) {
//         res.status(400).json(`${e}`);
//     }
// }

// //update and return the brand with id in request params and data in request body
// async function update(req: Request, res: Response) {
//     let user_type = 'user';
//     const{admin_email, admin_password}=process.env;
//     const token = req.headers.token as unknown as string;
//     const id = parseInt(req.params.id);
//     try {
//         const user_ = await user_obj.show(id);//get user from database with id in request params
//         //console.log(user_);
//         if(user_ == undefined)
//             return res.status(400).json('row not exist');
//         //check if request from super admin 
//         if(req.body.admin_email === admin_email && req.body.admin_password === admin_password){
//             user_type = 'super_admin';
//         }else if(token){//check the token if exist to know if admin or user want to update
//             const permession = jwt.verify(token, secret);
            
//             if(permession)
//             {
//                 const user = parseJwt(token);
//                 if(user.user.status == 'admin')
//                     user_type = 'admin'; 
//                 else if(id != user.user.id){
//                     return res.status(200).json('not allowed this change');
//                 }
//             }
//         }
        
//         //if user send the request
//         if(user_type == 'user'){

//             if(req.body.quantity)
//                 user_.quantity=req.body.quantity;
            
//         }else { //if admin or super admin

//             if(req.body.coupon_id)
//                 user_.coupon_id = parseInt(req.body.coupon_id);
//             if(req.body.status){
//                 if(req.body.status != 'admin')
//                     user_.status = req.body.status;
//                 else if(req.body.status == 'admin' && user_type === 'super_admin'){
//                     user_.status = req.body.status;
//                 }
//             }
            
//         }
        
//         //update and return the new token of updated user
//         const resualt = await user_obj.update(user_);
//         const new_token = jwt.sign({user:resualt},secret);
//         res.status(200).json({user:resualt,token:new_token});

//     } catch (e) {
//         res.status(400).send(`${e}`);
//     }
// }
// //create and return the brand with data in request body
// async function create(req: Request, res: Response) {
   
//     const token = req.headers.token as string;
    
//     try {
//         //check if the user super admin or admin
//         const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
//         //if admin or super admin the changes will occure to the brand
//         if (isAdmin) {
//             const b: brand = {
//                 name: req.body.name,
//                 description:req.body.description
//             };
//             //create new brand to the database and return new data
//             const resault = await brand_obj.create(b);
//             res.status(200).json(resault);
//         } else res.status(400).json('Not allowed this for you!!');

//     } catch (e) {
//         res.status(400).json(`${e}`);
//     }
// }
// //delete and return deleted using id in request params
// async function delete_(req: Request, res: Response) {
//     const token = req.headers.token as unknown as string;
    
//     try {

//         //check if the user super admin or admin
//         const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
//         //delete brand from the database and return deleted
//         //if admin or super admin the changes will occure to the brand
//         if (isAdmin) {
//             const resault = await order_obj.delete(Number(req.params.id));
//             res.status(200).json(resault);
//         } else res.status(400).json('Not allowed for you.');

//     } catch (e) {
//         res.status(400).json(`${e}`);
//     }
    
// }

// function mainRoutes(app: Application) {
//     app.get('/brands', index);
//     app.get('/brands/:id', show);
//     app.post('/brands', middelware(brandSchema.create), create);
//     app.patch('/brands/:id', middelware(brandSchema.create), update);
//     app.delete('/brands/:id', delete_);
// }

// export default mainRoutes;
