const mongoose = require('mongoose');

const bookmarkSchema = mongoose.Schema({
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
    place_image: {
        type: String
    },
    road_address_name: {
        type: String,
        minlength: 5
    },
    x: {
        type: String,
        maxlength: 50
    },
    y: {

    }
})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema)

module.exports = { Bookmark }