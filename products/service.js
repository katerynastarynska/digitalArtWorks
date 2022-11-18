const Product = require('./model');

async function getProductsByCategoryId(paramsId) {
    let products = [];
    try {
        products = await Product.find({ category_id: paramsId });
        console.log('service products bu category id', products);
        return products;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProductsByCategoryId,
}