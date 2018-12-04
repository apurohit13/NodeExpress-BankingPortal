const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

const {
    accounts,
    users,
    writeJSON
} = require("./data");

const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');

var port = process.env.port || 8080;

app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'ejs');

app.use('public', express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Account Summary',
        accounts: accounts
    });
})


app.get('/profile', function(req, res) {
    res.render('profile', { user: users[0] });
})

app.listen(port, function() {
    console.log(`PS Project Running on port ${port}!`)
});
