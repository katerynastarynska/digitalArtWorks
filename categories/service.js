const Category = require('./model');

async function getCategory() {
    let categories = [];
    try {
        categories = await Category.find();
        console.log('.....', categories);
        return categories;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getCategory,
}