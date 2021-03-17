import mongoose from 'mongoose'

const CarSchema = new mongoose.Schema({

    make: {
        type: String,
        trim: true,
        },

    model: {
        type: String,
        trim: true
        },

    year: {
        type: Number,
        max: 2021
        },

    description: {
        type: String,
        trim: true
        },

    owner: {
        type: String,
        default: 0
    },

    mods: {
        type: String,
        trim: true
    },

    //Images to be added

    buttonclicks: {
        type: Number,
        default: 0,
        min: 0
    },

})


export default mongoose.model('Car', CarSchema)