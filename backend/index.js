import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Knitting } from "./models/knittingModel.js";

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Добре дошли в плетки и отметки!');
});

// Route to get all knittings from database
app.get('/knittings', async (request, response) => {
    try {
        const knittings = await Knitting.find({});

        return response.status(200).json({
            count: knittings.length,
            data: knittings
        })
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route to get one knitting from database by id
app.get('/knittings/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const knitting = await Knitting.findById(id);

        return response.status(200).json(knitting);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});
//Route for Update a Knitting
app.put('/knittings/:id', async (request, response) => {
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
        const { id } = request.params;
        const result = await Knitting.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(400).send({
                message: 'Knitting not found'
            });
        }
        return response.status(200).send({ message: 'Knitting updated successfully' })
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})
// Route for Delete a knitting
app.delete('/knittings/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Knitting.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Book not found' })
        }
        return response.status(200).send({ message: 'Book deleted successfully' })

    } catch (error) {
        console.log(error.message);
        response.status(500).send
    }
});

// Route for Save a new Knitting
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
