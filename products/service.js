const Product = require('./model');

async function getProducts() {
    let products = [];
    try {
        products = await Product.find();
        console.log('------>', products);
        return products;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
}