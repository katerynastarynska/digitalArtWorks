const { getConnection, Schema, mongoose } = require("../database/database");
getConnection();

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    terms: Boolean,
});

const User = mongoose.model('User', userSchema); 
console.log(User)

module.exports = User;