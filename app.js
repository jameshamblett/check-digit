//jshint esversion: 6

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const checkDigit = require("./modules/functions.js");
const http = require("http");
const fs = require("fs");
const multer = require("multer");
const csv = require("fast-csv");


const app = express();

const upload = multer({
  dest: "tmp/csv/"
});
const server = http.createServer(app);
const port = process.env.PORT || 8000;

let message = "";
var response = "";

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get('/favicon.ico', (req, res) => res.status(204));

app.get("/", function(req, res) {
  res.render("index", {
    data: {
      message: "",
      valid: null
    }
  });
});

app.post("/", function(req,res){
  // declare container variable
  let container = req.body.container;
  response = checkDigit(container);
  res.render("index", {data: response});
});

app.post("/upload-csv", upload.single("file"), function(req, res) {
      const fileRows = [];
      csv.fromPath(req.file.path)
        .on("data", function(data) {
          fileRows.push(data);
        })
        .on("end", function() {
          console.log(fileRows);
          fs.unlinkSync(req.file.path);
          res.redirect("/");
          });
        });




    // app.listen(port, function() {
    //   console.log("Server started on port "+port);
    // });

    function startServer() {
      server.listen(port, function() {
        console.log("Express server listening on ", port);
      });
    }
    setImmediate(startServer);
