const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userId:Number,
    category: String,
    title: String,
    date: Date,
    time: Number,
    completed: Boolean
});

module.exports = mongoose.model("Todo", todoSchema);  