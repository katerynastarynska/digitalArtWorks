const { getConnection, Schema, mongoose } = require("../database/database");
getConnection();

const categorySchema = new Schema({
    title: String,
    image: String,
});

const Category = mongoose.model('Category', categorySchema); 
console.log(Category)

module.exports = Category;
