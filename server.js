import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import config from './config.js';
import seedRouter from './routes/seedRoutes.js';
import CategoryRouter from './routes/categoryRoutes.js';
import ProductRouter from './routes/productRoutes.js';
import UserRouter from './routes/userRoutes.js';
import OrderRouter from './routes/orderRoutes.js';
import uploadImage from './routes/uploadRoute.js';
import uploadProfile from './routes/uploadImage.js';

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

//router
app.use('/api/uploads', uploadImage);
app.use('/api/upload', uploadProfile);
app.use('/api/seed/', seedRouter);
app.use('/api/category/', CategoryRouter);
app.use('/api/products/', ProductRouter); 
app.use('/api/users/', UserRouter);
app.use('/api/orders/', OrderRouter);


//Connect with DB
const MONGODB_URI = process.env.MONGODB_URL;
dotenv.config();
mongoose.connect(MONGODB_URI).then(() =>{
    console.log("Connected to DB"); 
}).catch((error) => {
    console.log(error.message); 
});

app.use(cors());

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, './client/build')));

app.get('*', function (req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

app.use('/uploads', express.static(path.join(__dirname, '/./uploads')));

//Create port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at: http://localhost:${port}`);
});