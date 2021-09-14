import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
    title: {
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

module.exports = mongoose.model('BlogPost', blogPostSchema)