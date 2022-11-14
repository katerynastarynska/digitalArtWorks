const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const { getConnection } = require('./database/database');
const userService = require('./users/service');
const categoriesService = require('./categories/service');
const { Error } = require('mongoose');
const port = 3000;

app.use(express.static(path.join(__dirname, './client/public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './client/index.html'));
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './client/login.html'));
})
app.post('/login', async (req, res) => {
    const body = req.body;
    if (!body.email || !body.password || body.length === 0) {
        res.status(400).json({
            error: "Please check your information"
        })
        return;
    }
    try {
        const userId = await userService.loginUser(body)
        console.log(userId);
       if(userId) {
        res.status(200).json({
            userId
        })}
    } catch (error) {
        res.status(400).json({
            error: error
        })
        return;
    }

})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, './client/signup.html'));
})
app.post('/signup', async (req, res) => {
    try {
        await userService.saveUser(req.body)
    } catch (error) {
        res.status(400).json({
            error: error
        })
        return;
    }
    res.status(200).json({
        message: 'User created successfully'
    })
})

app.get('/how-it-works', (req, res) => {
    console.log('access route /, METHOD = GET')
    res.sendFile(path.join(__dirname, './client/how-it-works.html'));
})
app.get('/categories', async (req, res) => {
    console.log('access route categories /, METHOD = GET')
    res.sendFile(path.join(__dirname, './client/categories.html'))
    а
})

app.get('/categories-data', async (req, res) => {
    let categories;
    try {
        categories = await categoriesService.getCategory()
        console.log('categories -> ', categories);
        res.json(categories);
        res.end();
    } catch (error) {
        res.status(400).json({
            error: error
        })
        return
    }
})

app.listen(port, async () => {
    console.log('listening on port:', port);
    await getConnection();
    console.log('connected to db');
})

module.exports = app;