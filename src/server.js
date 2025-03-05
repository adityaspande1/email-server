import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import  bodyparser from 'body-parser';

import emailRoutes from './routes/emailRoutes.js';

dotenv.config(
    {
        path:"../.env"
    }
);

const app = express();
const PORT = 3000;
app.use(cors(
    {
        origin:"*"
    }
));
app.use(bodyparser.json());
app.use('/api',emailRoutes);


app.listen(PORT,()=>{
    console.log("Server is running on port 3000");
})