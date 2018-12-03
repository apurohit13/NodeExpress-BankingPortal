const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

var port = process.env.port || 8080;

app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'ejs');

app.use('public', express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));

const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'UTF8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'UTF8');
const users = JSON.parse(userData);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Account Summary',
        accounts: accounts
    });
})

app.get('/savings', function(req, res) {
    res.render('account', { account: 'accounts.savings' });
})

app.get('/checking', function(req, res) {
    res.render('account', { account: 'accounts.checking' });
})

app.get('/credit', function(req, res) {
    res.render('account', { account: 'accounts.credit' });
})

app.get('/savings', function(req, res) {
    res.render('account', { account: 'accounts.savings' });
})

app.get('/profile', function(req, res) {
    res.render('profile', { user: users[0] });
})


app.listen(port, function() {
    console.log(`PS Project Running on port ${port}!`)
});
