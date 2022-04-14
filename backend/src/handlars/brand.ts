import { Application, Response, Request } from 'express';
import { Brand, brand } from '../models/brand';
import isAdminFun from '../service/isAdmin';





const brand_obj = new Brand();
//return all brands in database
async function index(req: Request, res: Response) {
    
    try {
        const resault = await brand_obj.index();
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return only one brand from databse using id in request params
async function show(req: Request, res: Response) {
    try {
        const resault = await brand_obj.show(req.params.id as unknown as number);
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

//update and return the brand with id in request params and data in request body
async function update(req: Request, res: Response) {
    const token = req.headers.token as string;
    
    //check if the user super admin or admin
    const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
    //if admin or super admin the changes will occure to the brand
    if (isAdmin) {
        try {
            const b = await brand_obj.show(parseInt(req.params.id));

            if(req.body.name)
                b.name = req.body.name;
            
            if(req.body.description)
                b.description = req.body.description;
            //update new data to the database and return new data
            const resault = await brand_obj.update(b);
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed login first!!');
}
//create and return the brand with data in request body
async function create(req: Request, res: Response) {
   
    const token = req.headers.token as string;
    //check if the user super admin or admin
    const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
    //if admin or super admin the changes will occure to the brand
    if (isAdmin) {
        try {
            const b: brand = {
                name: req.body.name,
                description:req.body.description
            };
            //create new brand to the database and return new data
            const resault = await brand_obj.create(b);
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed login first!!');
}
//delete and return deleted using id in request params
async function delete_(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    //check if the user super admin or admin
    const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
    //if admin or super admin the changes will occure to the brand
    if (isAdmin) {
        try {
            //delete brand from the database and return deleted
            const resault = await brand_obj.delete(Number(req.params.id));
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else res.send('Not allowed login first!!');
}

function mainRoutes(app: Application) {
    app.get('/brands', index);
    app.get('/brands/:id', show);
    app.post('/brands', create);
    app.patch('/brands/:id', update);
    app.delete('/brands/:id', delete_);
}

export default mainRoutes;
