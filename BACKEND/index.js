import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
//allows us to parse incomming requests with json payloads


app.get('/', (req,res) => {
    res.send("Hello World!...");
});

app.use('/api/auth', authRoutes);

app.listen(PORT,() => {
    connectDB();
    console.log(`Server is Running at port ${PORT}`);
})

//JiFgNkfF4hMIRrnO

//mongodb+srv://pachahemanthsai_db_user:JiFgNkfF4hMIRrnO@cluster0.buzk8lh.mongodb.net/?appName=Cluster0