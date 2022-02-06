const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.user_singUp = (req, res, next) => {
    //sprawdzam czy juz przypadkiem nie isnieje konto o danym juz emailu
    User.find({email: req.body.email}).exec()
    .then(result => {
        if(result.length > 0){
            return res.status(409).json({wiadomosc: "Email taki juz istnieje"});
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash)=> {
                if(err) {
                    return res.status(500).json({wiadomosc: err});
                } else {
                        const user = new User ({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                });
                    user.save()
                    .then(result => {
                        res.status(201).json({
                            wiadomosc: "Użytkownik został utworzony"
                        });
                    }).catch(err => res.status(500).json({wiadomosc: err}));
                }
            });
        }
    }).catch(err => res.status(500).json({wiadomosc: err}));
                
}

exports.user_login = (req, res, next) => {
    //szukam usera o poadnym emailu
    User.findOne({email: req.body.email}).exec()
    .then(user => {
        //gdy nie ma usera o danym emailu
        if(!user) {
            return res.status(404).json({wiadomosc: "Bład autoryzacji"});
        }
        //jest taki user
        //sprawdzanie czy haslo jest ok
        bcrypt.compare(req.body.password, user.password)
        .then(result => {
            if(result) {
                //generuje jwt
                const token = jwt.sign({
                    email: user.email,
                    id: user._id
                }, 
                process.env.klucz,
                {
                    expiresIn:"1h"
                }
                );
                return res.status(200).json({
                    wiadomosc: "Autoryzacja się powiodła",
                    token: token
                })
            }
            return res.status(409).json({wiadomosc: "Błąd autoryzacji"})
        })
    })
    .catch(err => res.status(500).json({wiadomosc: err}));
}

exports.user_deliteAccount = (req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
    .exec()
    .then(() => {
        res.status(200).json({wiadomosc: "Usunięto uzytkownika"});
    })
    .catch(err => res.status(500).json({wiadomosc: err}));
}