const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, './client/public')));

app.get('/', (req, res) => {
    console.log("access route /, METHOD = GET")
    res.sendFile(path.join(__dirname, './client/index.html'));
})

app.listen(port, () => {
    console.log("listening on port:", port)
})