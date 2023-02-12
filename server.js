import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import apartmentsRouter from './routers/apartments.js';
import mongoose from 'mongoose';
import cors from 'cors';

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to Database'))
    .catch((e) => console.error(e.message));

const PORT = 8000;
const app = express();
app.use(express.json());
app.use(cors({origin : "http://localhost:3000"}));

app.use('/apartments', apartmentsRouter);

app.listen(PORT, () => console.log(`Server Started`));