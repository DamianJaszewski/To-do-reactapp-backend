const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.klucz);
        //przechodze dalej
        next();
    }
    catch(err) {
        return res.status(409).json({wiadomosc: "Błąd autoryzacji"});
    }
}