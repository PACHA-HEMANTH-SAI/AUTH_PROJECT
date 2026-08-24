import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
app.use(cors({origin : 'http://localhost:5173', credentials : true}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/FRONTEND/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "FRONTEND", "dist", "index.html"));
    })
}

app.listen(PORT,() => {
    connectDB();
    console.log(`Server is Running at port ${PORT}`);
})

//JiFgNkfF4hMIRrnO

//mongodb+srv://pachahemanthsai_db_user:JiFgNkfF4hMIRrnO@cluster0.buzk8lh.mongodb.net/?appName=Cluster0