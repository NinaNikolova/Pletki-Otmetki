import express from 'express';
import { Knitting } from '../models/knittingModel.js';

const router = express.Router();

// Route to get all knittings from database
router.get('/', async (request, response) => {
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
router.get('/:id', async (request, response) => {
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
router.put('/:id', async (request, response) => {
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
router.delete('/:id', async (request, response) => {
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
router.post('/', async (request, response) => {
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

});
export default router;