import express, { json } from 'express';
import router from './Routes/urlRoutes.js';
import cors from cors;

const app = express();

app.use(cors());
app.use(json());
app.use("/api",router);


export default app;