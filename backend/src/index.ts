import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import productRoute from './handlars/products';
import brandRoute from './handlars/brand';
import categoriesRoute from './handlars/catogery';
import usersRoute from './handlars/users';
import couponRoute from './handlars/coupon';
import ordersRoute from './handlars/orders';
import feedbackRoute from './handlars/feedback';

dotenv.config();

//initial port and app
const port = process.env.port || 5000;
const app = express();
//usig middel ware cors and body parser
app.use(bodyParser.json());
app.use(cors());

//configre the server to listen to port and running it
app.listen(port, (): void => {
    console.log(`server running on port ${port}`);
});

//run modules of the project
//userRoute(app);
//orderRoute(app);
productRoute(app);
brandRoute(app);
couponRoute(app);
feedbackRoute(app);
usersRoute(app);
categoriesRoute(app);
ordersRoute(app);

//export the app to use when importing the file
export default app;