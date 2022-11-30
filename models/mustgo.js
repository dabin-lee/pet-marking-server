const mongoose = require('mongoose');

const mustgoSchema = mongoose.Schema({
    address_name: {
        type: String,
        maxlength: 50
    },
    category_group_code: {
        type: String
    },
    category_name: {
        type: String,
        minlength: 5
    },
    phone: {
        type: String,
        maxlength: 50
    },
    place_name: {
        type: String,
        maxlength: 50
    },
    place_url: {
        type: String
    },
    road_address_name: {
        type: String,
        minlength: 5
    },
    place_image: {
        type: String
    },
    x: {
        type: String,
        maxlength: 50
    },
    y: {
        type: String,
        maxlength: 50
    }
})

const Mustgo = mongoose.model('Mustgo', mustgoSchema)

module.exports = { Mustgo }