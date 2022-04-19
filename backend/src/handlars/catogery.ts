import { Application, Response, Request } from 'express';
import { Catogery, catogery } from '../models/catogery';
import isAdminFun from '../service/isAdmin';
import { middelware } from '../service/middelware';
import { catSchema } from '../service/validation';



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
        if(resault == undefined)
            return res.status(400).json('row not exist');
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}


//update and return the catogery with id in request params and data in request body
async function update(req: Request, res: Response) {
    const token = req.headers.token as string;
    
    
    try {
        //check if the user super admin or admin
        const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
        //if admin or super admin the changes will occure to the catogery
        if (isAdmin) {
            const c = await catogery_obj.show(req.params.id as unknown as number);
            if(c == undefined)
                return res.status(400).json('row not exist');

            if(req.body.name)
                c.name = req.body.name;
            
            const resault = await catogery_obj.update(c);
            res.status(200).json(resault);
        } else res.status(400).json('Not allowed this for you!!');

    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

//create and return the catogery with data in request body
async function create(req: Request, res: Response) {
   
    const token = req.headers.token as string;
    

    try {
        //check if the user super admin or admin
        const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
        //if admin or super admin the changes will occure to the catogery
        if (isAdmin) {
            const c: catogery = {
                name: req.body.name,
            };
            const resault = await catogery_obj.create(c);
            res.status(200).json(resault);
        } else res.status(400).json('Not allowed this for you!!');

    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

//delete and return deleted using id in request params
async function delete_(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    
    try {

        //check if the user super admin or admin
        const isAdmin = isAdminFun(req.body.admin_email,req.body.admin_password,token);
        //if admin or super admin the changes will occure to the catogery
        if (isAdmin) {
            const resault = await catogery_obj.delete(Number(req.params.id));
            res.status(200).json(resault);
        } else res.status(400).json('Not allowed this for you!!');

    } catch (e) {
        res.status(400).json(`${e}`);
    }
}

function mainRoutes(app: Application) {
    app.get('/categories', index);
    app.get('/categories/:id', show);
    app.post('/categories', middelware(catSchema.create), create);
    app.patch('/categories/:id', middelware(catSchema.create), update);
    app.delete('/categories/:id', delete_);
}

export default mainRoutes;
