import express from 'express';

//initial port and app
const port = 5002;
const app = express();

//configre the server to listen to port and running it
app.listen(port, ():void=>{
    console.log(`srever running on port ${port}`);
});


//export the app to use when importing the file
export default app;