const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true, unique: true, trim: true, minlength: 5 },
    body: { type: String, required: true, trim: true, minlength: 5 },
    images: { type: Array, required: false },
    tags: { type: Array, required: false },
    date: { type: Date, required: true },

}, { timestamps: true } );

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

