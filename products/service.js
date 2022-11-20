const Product = require('./model');

async function getProductsByCategoryId(paramsCategoryId) {
    let products = [];
    try {
        products = await Product.find({ category_id: paramsCategoryId });
        return products;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProductsByCategoryId,
}