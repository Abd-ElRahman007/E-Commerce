import { Application, Response, Request } from 'express';
import { Catogery, catogery } from '../models/catogery';
import isAdminFun from '../service/isAdmin';



const catogery_obj = new Catogery();
//return all catogeries in database
async function index(req: Request, res: Response) {
    try {
        const resault = await catogery_obj.index();
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return only one catogery from databse using id in request params
async function show(req: Request, res: Response) {
    try {
        const resault = await catogery_obj.show(req.params.id as unknown as number);
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}


//update and return the catogery with id in request params and data in request body
async function update(req: Request, res: Response) {
    const token = req.headers.token as string;
    
    //check if the user super admin or admin
    const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
    //if admin or super admin the changes will occure to the catogery
    if (isAdmin) {
        const c = await catogery_obj.show(req.params.id as unknown as number);
        try {
            
            if(req.body.name)
                c.name = req.body.name;
            
            const resault = await catogery_obj.update(c);
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else throw new Error('Not allowed this for you!!');
}

//create and return the catogery with data in request body
async function create(req: Request, res: Response) {
   
    const token = req.headers.token as string;
    //check if the user super admin or admin
    const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
    //if admin or super admin the changes will occure to the catogery
    if (isAdmin) {

        try {
            const c: catogery = {
                name: req.body.name,
            };
            const resault = await catogery_obj.create(c);
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else throw new Error('Not allowed this for you!!');
}

//delete and return deleted using id in request params
async function delete_(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    //check if the user super admin or admin
    const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
    //if admin or super admin the changes will occure to the catogery
    if (isAdmin) {
        try {
            const resault = await catogery_obj.delete(
        req.params.id as unknown as number
            );
            res.status(200).json(resault);
        } catch (e) {
            res.status(400).json(`${e}`);
        }
    } else throw new Error('Not allowed this for you!!');
}

function mainRoutes(app: Application) {
    app.get('/categories', index);
    app.get('/categories/:id', show);
    app.post('/categories', create);
    app.patch('/categories/:id', update);
    app.delete('/categories/:id', delete_);
}

export default mainRoutes;
