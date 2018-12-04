const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

const {
    accounts,
    users,
    writeJSON
} = require("./data");


var port = process.env.port || 3000;

app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'ejs');

app.use('public', express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));

app.use(express.urlencoded({ extended: true }));

// const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'UTF8');
// const accounts = JSON.parse(accountData);

// const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'UTF8');
// const users = JSON.parse(userData);

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

app.get('/transfer', function(req, res) {
    res.render('transfer');
})

app.post('/transfer', function(req, res) {
    var from = req.body.from;
    var to = req.body.to;
    accounts[from].balance = parseInt(accounts[from].balance) - parseInt(req.body.amount);;
    accounts[to].balance = parseInt(accounts[to].balance) + parseInt(req.body.amount);
    writeJSON();
    res.render('transfer', { message: "Transfer Completed" })
})

app.get('/payment', function(req, res) {
    res.render('payment', { account: accounts.credit });
})

app.post('/payment', function(req, res) {
    accounts.credit.balance = parseInt(accounts.credit.balance) - parseInt(req.body.amount);
    accounts.credit.available = parseInt(accounts.credit.available) + parseInt(req.body.amount);
    writeJSON();
    res.render('payment', { message: "Payment Successful", account: accounts.credit })
})

app.listen(port, function() {
    console.log(`PS Project Running on port ${port}!`)
});
