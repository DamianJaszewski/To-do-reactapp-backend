const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    time: Number,
    difficulty: Number
});

module.exports = mongoose.model("Recipe", recipeSchema);  