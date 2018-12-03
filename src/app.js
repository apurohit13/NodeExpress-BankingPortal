const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

var port = process.env.port || 3000;

app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'ejs');

app.use('public', express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));

app.get('/', function(req, res) {
    res.render('index', { title: 'Index' });
})

app.listen(port, function() {
    console.log(`PS Project Running on port ${port}!`)
});
