import cloudinary from 'cloudinary';
import { Application, Response, Request } from 'express';

const cloud = cloudinary.v2;


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

function mainRoutes(app: Application) {
    app.get('/imageSignature',api_image);
}

export default mainRoutes;