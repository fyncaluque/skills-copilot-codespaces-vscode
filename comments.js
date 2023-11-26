// Create web server
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// Create database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/commentDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Create schema
var commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// Create model
var Comment = mongoose.model('Comment', commentSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

router.get('/get-data', function(req, res) {
    Comment.find({}, function(err, data) {
        if (err) throw err;
        res.send(data);
    });
});

router.post('/insert', urlencodedParser, function(req, res) {
    var newComment = Comment(req.body).save(function(err, data) {
        if (err) throw err;
        res.json(data);
    });
});

router.delete('/delete/:id', function(req, res) {
    Comment.find({ _id: req.params.id.replace(/\-/g, " ") }).remove(function(err, data) {
        if (err) throw err;
        res.json(data);
    });
});

module.exports = router;