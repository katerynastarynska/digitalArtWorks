const Product = require('./model');

async function getProductsByCategoryId(paramsCategoryId) {
    console.log('>>> service params category >>> ', paramsCategoryId);
    let products = [];
    try {
        products = await Product.find({ category_id: paramsCategoryId });
        console.log('>>>> products | service | by category id >>>', products);
        return products;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProductsByCategoryId,
}