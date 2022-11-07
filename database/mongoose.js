const mongoose = require('mongoose');
let connection = '';

async function getConnection() {
    if (!connection) {
        console.log('new');
        connection = await mongoose.connect('mongodb+srv://KaterynaStarynska:emily18artem1@cluster0.ljmbs6z.mongodb.net/?retryWrites=true&w=majority')
        return connection;
    } else {
        console.log('exists');
        return connection;
    }
}

module.exports = {
    getConnection, 
    mongoose,
    Schema: mongoose.Schema,
}

