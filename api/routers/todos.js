const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const checkAuth = require("../middleware/checkAuth");

const TodosController = require("../controllers/todos");

// miejsce skladowania plikow ze zdjeciam

//wyciągam ruter
const router = express.Router();

//autoryzacja uzytkownika
router.post("/auth", async (req, res) => {
    const { token }  = req.body
    const ticket = client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const { name, email, picture } = ticket.getPayload();    
    const user = db.user.upsert({ 
        where: { email: email },
        update: { name, picture },
        create: { name, email, picture }
    })
    req.session.userId = user.id
    res.status(201)
    res.json(user)
});

//lista wszystkich zadań
router.get("/", TodosController.todos_get_schowAll
);

//dodanie nowego zadania
router.post("/", TodosController.todos_post_newTodo
);

//pokazanie zadania o podanym id
router.get("/:day", TodosController.todos_get_by_id
);

// zmiana zadania o podanym id
router.put("/:id", TodosController.todos_put_change
);

//zmiana statusu zadania
 router.put("/ukonczone/:id", TodosController.todos_put_change_done
 );

//usuniecie zadania 
router.delete("/:id", TodosController.todos_delete_removeTodoById 
 );

module.exports = router