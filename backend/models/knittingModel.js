import mongoose from "mongoose";

const knittingSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    color: {
        type: String,
        require: true,
    },
    size: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    img: {
        type: String,
        require: true,
    }

},
    {
        timestamps: true,
    });

export const Knitting = mongoose.model('Knitting', knittingSchema);