//jshint esversion: 6

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const checkDigit = require("./modules/functions.js");


const port = process.env.PORT || 8000;
let message="";
var response ="";

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get('/favicon.ico', (req, res) => res.status(204));

app.get("/", function(req,res){
  res.render("index", {data:{message:"", valid:null}});
});

app.post("/", function(req,res){
  // declare container variable
  let container = req.body.container;
  response = checkDigit(container);
  res.render("index", {data:response});
});

app.listen(port, function() {
  console.log("Server started on port "+port);
});
