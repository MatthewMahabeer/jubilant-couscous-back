import * as dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import {brandRouter} from './routes/brand.routes';
import { modelRouter } from './routes/model.routes';
dotenv.config();

if(!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

//initialize express app with typescript
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use("/api/brands", brandRouter);
app.use("/api/models", modelRouter);


//listen to port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});