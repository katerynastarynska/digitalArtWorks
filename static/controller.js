const path = require('path');

function renderMainPage(req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
}

function renderHowItWorks(req, res) {
    console.log('access route /, METHOD = GET')
    res.sendFile(path.join(__dirname, '../client/how-it-works.html'));
}

function renderCheckout(req, res) {
    console.log('access route bestsellers/, METHOD = GET')
    res.sendFile(path.join(__dirname, '../client/checkout.html'));
}

module.exports = {
    renderMainPage,
    renderHowItWorks,
    renderCheckout
}