const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: Array,
        required: true
    },
    categoryColor: {
        type: String,
        required: true
    },
    imageLink: {
        type: String,
        required: true
    },
    paragraphs: {
        type: Array,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Blogpost', blogPostSchema)