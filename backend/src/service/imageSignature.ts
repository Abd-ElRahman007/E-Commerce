import cloudinary from 'cloudinary';
import { Application, Response, Request } from 'express';
import { Api404Error } from './errorHandling';
const cloud = cloudinary.v2;

//return time stamp and signature of an image to front end
async function api_image(req:Request, res:Response){
    try{
        const timestamp=Math.round((new Date).getTime()/1000);

        const signature =cloud.utils.api_sign_request({
            timestamp:timestamp,		
        },process.env.API_SECRET as unknown as string);
        res.statusCode=200;
        res.json({signature,timestamp});
    }catch(error){
        res.statusCode=400;
        res.send(error);
    }
	
}
async function not_found(req:Request, res:Response) {
    const o = new Api404Error('not fund');
    
    res.status(404).send(o.message);
}
//route for function
function mainRoutes(app: Application) {
    app.get('/imageSignature',api_image);
    app.use('*',not_found);
}

export default mainRoutes;