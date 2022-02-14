const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

//łącze się z bazą
mongoose.connect("mongodb+srv://Kucharz:"+ process.env.password +"@cluster.1djfv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

// stworzenie instancji
const app = express();

app.use(cors());

//parsowanie części body
app.use (bodyParser.json());

//logger
app.use(morgan("combined"));

//routy
const recipeRoutes = require("./api/routers/recipes");
const todoRoutes = require("./api/routers/todos");
const userRoutes = require("./api/routers/users");
const calendarRoutes = require("./api/routers/calendar");

//statyczny katalog ze zdjeciami
app.use("/uploads", express.static("uploads"));

app.use("/przepisy", recipeRoutes);
app.use("/zadania", todoRoutes)
app.use("/users", userRoutes);
app.use("/kalendarz", calendarRoutes)
app.use((req, res, next) => {
    res.status(404).json({wiadomość: "Nie znaleziono"});
});

module.exports = app;


//mongodb+srv://kucharz:<password>@clusternatalia.oppoh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority