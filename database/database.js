const mongoose = require('mongoose');
// const { initializeApp } = require('firebase/app');
// const firebaseApp = initializeApp({
//     apiKey: "API_KEY",
//     authDomain: "PROJECT_ID.firebaseapp.com",
//     databaseURL: "https://DATABASE_NAME.firebaseio.com",
//     projectId: "PROJECT_ID",
//     storageBucket: "PROJECT_ID.appspot.com",
//     messagingSenderId: "SENDER_ID",
//     appId: "APP_ID",
//     measurementId: "G-MEASUREMENT_ID",
// })
// console.log(firebaseApp);

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

