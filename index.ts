import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { fileRouter } from './routers/file';
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'

dotenv.config();
require('./database/connection')()

const app: Express = express();
const port = process.env.PORT;

app.use(cors())
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

const APIRouter = express.Router()
app.use('/', APIRouter)
APIRouter.use(bodyParser.json())
APIRouter.use('/file', fileRouter);