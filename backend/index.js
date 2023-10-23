import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Knitting } from "./models/knittingModel.js";
import knittingsRouter from './routes/knittingsRoute.js'

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}))

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Добре дошли в плетки и отметки!');
});

app.use('/knittings', knittingsRouter);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        });
    }).catch((error) => {
        console.log(error);
    })
