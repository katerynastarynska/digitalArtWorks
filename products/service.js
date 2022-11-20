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

async function getBestsellers() {
    let products = [];
    try {
        products = await Product.find({ isBestseller: true });
        console.log('bestsellers | -> service ', products);
        return products;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProductsByCategoryId,
    getBestsellers
}