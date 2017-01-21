'use strict';

var express = require('express');
var app = express();
const PORT = process.env.PORT || 8000;
var path = require('path');
var multer = require('multer');

var storage = multer.memoryStorage();
var upload = multer({storage: storage});


var fileName = path.join(__dirname, './public');
app.use(express.static(fileName));

console.log(fileName);

console.log(path.join(fileName,  "js/app.js"));

//app.use('/', express.static(__dirname +'./client'));
/*
app.get('/', function(req, res) {
  var fileName = path.join(__dirname, './client/index.html');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});
*/

app.post("/upload", upload.single('data'), function(req, res) {
    if (req.file) {
        res.status(200).json({
            filename: req.file.originalname,
            size: req.file.size,
            type: req.file.mimetype
        });
    } else {
        res.status(500).json({ error: 'No file was selected' });
    }
});



app.listen(PORT, function() {
	console.log('app listening on port: ' + PORT);
});