import express from 'express';
const app = express();
import customersRoute from './routes/customer';
// import imageuploadRoute from './routes/imageupload';
import cors from 'cors';



app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use('/customers', customersRoute)

// app.use('/image', imageuploadRoute)
app.listen('8000', ()=>{
    console.log("Listening on port 8000");
})




