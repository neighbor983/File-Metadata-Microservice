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