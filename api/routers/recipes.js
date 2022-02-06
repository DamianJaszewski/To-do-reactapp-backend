const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const checkAuth = require("../middleware/checkAuth");

const RecipesController = require("../controllers/recipes");

// miejsce skladowania plikow ze zdjeciami

const storage = multer.diskStorage({
    destination: function  (req, file, cb) {
    cb(null,"./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null,new Date().toISOString().replace(":","_").replace(":","_") + file.originalname);
    }

});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 5*1024*1024},
    fileFilter: fileFilter
});


//wyciągam ruter
const router = express.Router();

//lista wszystkich przepisów
router.get("/", RecipesController.recipes_get_schowAll
);

//dodanie nowego przepisu
router.post("/", RecipesController.recipes_post_newRecipe
);

//pokazanie przepisu o podanym id
router.get("/:przepisId", RecipesController.recipes_get_by_id
);
// zmiana przepisu o podanym id
router.put("/", checkAuth, RecipesController.recipes_put_change
 );
//usuniecie przepisu 
router.delete("/:przepisId", checkAuth, RecipesController.recipes_delete_removeRecipeById
 );

module.exports = router