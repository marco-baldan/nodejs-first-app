import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routers';
import express, { Router, NextFunction, Request, Response } from 'express';

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`\nServer is on port 'http://localhost:${PORT}/'\n`);
});