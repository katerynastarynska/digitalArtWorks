const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const { getConnection } = require('./database/mongoose');
const userService = require('./users/service');
const port = 3000;

app.use(express.static(path.join(__dirname, './client/public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './client/index.html'));
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './client/login.html'));
})
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, './client/signup.html'));
})
app.post('/signup', async (req, res) => {
    console.log(req.body);
    try {
        await userService.saveUser(req.body)
    } catch (err) {
        res.status(400).json({
            error: err
        })
        return
    }
    res.status(200).json({
        message: 'user created successfully'
    })
})

app.get('/how-it-works', (req, res) => {
    console.log('access route /, METHOD = GET')
    res.sendFile(path.join(__dirname, './client/how-it-works.html'));
})

app.listen(port, async () => {
    console.log('listening on port:', port);
    await getConnection();
    console.log('connected to db');
})

module.exports = app;