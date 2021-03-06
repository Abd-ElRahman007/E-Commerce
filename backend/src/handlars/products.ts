import { Application, Response, Request } from 'express';
import { Product, product } from '../models/products';
import pagination from '../service/pagination';
import isTrue from '../service/filtering';
import isAdminFun from '../service/isAdmin';
import { middelware } from '../service/middelware';
import { productSchema } from '../service/validation';
const product_obj = new Product();

/*
return all products from database with or without pagination.
can search with [category or brand or string in name] in request params with or without pagination

pagination [page:number of the current page, limit:the number of product in one page] in request params
 */
async function index(req: Request, res: Response) {
    const category_ = Number(req.query.category);
    const brand_ = Number(req.query.brand);
    const product_name = req.query.name as string;
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    
    try {
        //return all products from database
        let model_result = await product_obj.index();
        
        //if brand in the request params will filter the products with brand
        if(!isNaN(brand_)){
            model_result = model_result.filter(x => x.brand_id == brand_);
        }
        //if category in the request params will filter the products with category
        if(!isNaN(category_)){
            model_result = model_result.filter(x => x.category_id == category_ );
        }   
        //if name or subset of name in the request params will filter the products with it
        if(product_name != undefined){
            model_result = model_result.filter(x => isTrue(x.name as unknown as string, product_name));
        }
        
        //if page and limit exist in the request params will paginate the result
        if(limit && page){
            res.status(200).json(pagination(page, limit, model_result));
        }else//else will return all the products without pagination
            res.status(200).json(model_result);
        
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return onlay one product by using id in request params
async function show(req: Request, res: Response) {
    try {
        const result = await product_obj.show(req.params.id as unknown as number);
        
        if(result == undefined)
            return res.status(400).json('row not exist');
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

//update product and return the product after changes [only for admin and super admin]
async function update(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    
        
    try {
        //check if the request from super admin?
        const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
        //if admin or super admin the changes will occure to the product
        if (isAdmin) {
            const product_ = await product_obj.show(parseInt(req.params.id));
            if(product_ == undefined)
                return res.status(400).json('row not exist');

            if(req.body.name){
                product_.name = req.body.name;
            }
            if(req.body.price){
                product_.price = parseInt(req.body.price);
            }
            if(req.body.code){
                product_.code = req.body.code;
            }
            if(req.body.model){
                product_.model = req.body.model;
            }
            if(req.body.image){
                product_.image = req.body.image;
            }
            if(req.body.images){
                product_.images = req.body.images;
            }
            if(req.body.description){
                product_.description = req.body.description;
            }
            if(req.body.category_id){
                product_.category_id = parseInt(req.body.category_id);
            }
            if(req.body.currency){
                product_.currency = req.body.currency;
            }
            if(req.body.vote_count){
                product_.vote_count = parseInt(req.body.vote_count);
            }
            if(req.body.vote_total){
                product_.vote_total = parseInt(req.body.vote_total);
            }
            if(req.body.stock){
                product_.stock = parseInt(req.body.stock);
            }
            if(req.body.brand_id){
                product_.brand_id = parseInt(req.body.brand_id);
            }
            //update the product with new data and update changes in database and return to front new updates    
            const result = await product_obj.update(product_);
            res.status(200).json(result);
        } else
            res.status(400).json('token required.');
    } catch (e) {
        res.status(400).json(`${e}`);
    }
    
}

async function create(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    
    try {
        //check if the request from super admin?
        const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
        //if admin or super admin the product will be created in database
        if (isAdmin) {
            const p: product = {
                name: req.body.name,
                price: Number(req.body.price),
                code:req.body.code,
                model:req.body.model,
                image:req.body.image,
                images:req.body.images,
                description:req.body.description,
                category_id:Number(req.body.category_id),
                currency:req.body.currency,
                vote_count:Number(req.body.vote_count),
                vote_total:Number(req.body.vote_total),
                stock:Number(req.body.stock),
                brand_id:Number(req.body.brand_id),
            };
            //create the product in database and return the product to front
            const result = await product_obj.create(p);
            res.status(200).json(result);
        } else res.status(400).json('Not allowed login first!!');

    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
//delete product using id in request params [only for admins]
async function delete_(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    
    try {
        //check if the request from super admin?
        const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);

        if (isAdmin) {//if admin or super admin will return deleted and delete the product
            const result = await product_obj.delete(parseInt(req.params.id));
            res.status(200).json(result);
        } else res.status(400).json('Not allowed login first!!');

    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
//main routes of product model
function mainRoutes(app: Application) {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', middelware(productSchema.create), create);
    app.patch('/products/:id',  middelware(productSchema.update), update);
    app.delete('/products/:id', delete_);
}

export default mainRoutes;

