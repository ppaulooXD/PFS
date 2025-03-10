const express = require('express');
const expressEjsLayout = require("express-ejs-layouts");
const rotaLogin = require('./routes/rotaLogin');
const rotaHome = require("./routes/rotaHome");
const rotaUsuario = require("./routes/rotaUsuario");
const app = express();
const porta = 5000;

app.set('views engine','ejs');
app.use(express.static("public"));
app.set("layout", "./layout.ejs");
app.use(expressEjsLayout);
app.use(express.urlencoded({extended:true}));

app.use("/", rotaHome);
app.use("/login", rotaLogin);
app.use("/usuario", rotaUsuario);

app.listen(porta,function (){
    console.log("Servidor em execução");
});