import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Knitting } from "./models/knittingModel.js";

const app = express();
app.use(express.json());

// Route to get all knittings from database
app.get('/', async (request, response) => {
    try {
        const knittings = await Knitting.find({});

        return response.status(201).send(knittings);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

app.post('/knittings', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.color ||
            !request.body.size ||
            !request.body.gender ||
            !request.body.img
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, color, size, gender, img'
            });
        }
        const newKnitting = {
            title: request.body.title,
            color: request.body.color,
            size: request.body.size,
            gender: request.body.gender,
            img: request.body.img
        }
        const knitting = await Knitting.create(newKnitting);
        return response.status(201).send(knitting);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }

})


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
