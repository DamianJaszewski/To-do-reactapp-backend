// import pakietów
const http = require("http");
const app = require("./app");

// numer portu
const port = process.env.port || 3000;

//tworzenie serwera
const server = http.createServer(app);

//odpalam serwer
server.listen(port, () =>{
    console.log("Serwer śmiga!");
});