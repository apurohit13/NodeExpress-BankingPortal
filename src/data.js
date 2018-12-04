const fs = require('fs');
const path = require('path');

const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'UTF8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'UTF8');
const users = JSON.parse(userData);

function writeJSON() {
    var dataJSON = JSON.stringify(accounts, null, 4);
    fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), dataJSON, 'UTF8')
}

module.exports = {
    accounts,
    users,
    writeJSON
}
