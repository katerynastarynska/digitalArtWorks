const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { getConnection } = require('./database/database');
const cookieParser = require('cookie-parser');

const staticRoutes = require('./static/route')
const categoriesRoutes = require('./categories/route');
const productsRoutes = require('./products/route');
const userRoutes = require('./users/route');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, './client/public')));
app.use(bodyParser.json());
app.use(cookieParser());

staticRoutes(app);
productsRoutes(app);
categoriesRoutes(app);
userRoutes(app);

app.listen(port, async () => {
    console.log('listening on port:', port);
    await getConnection();
    console.log('connected to db');
})

module.exports = app;