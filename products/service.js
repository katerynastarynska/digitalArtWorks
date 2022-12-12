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

async function getProductByProductId(paramsProductId) {
    console.log('>>>> service product id >>>> ', paramsProductId);
    let product = "";
    try {
        product = await Product.findById(paramsProductId);
        console.log('product by id | -> service ', product);
        return product;
    } catch (error) {
        console.log(error)
    }
}

async function addProductData(product) {
    console.log('>>> product in service >>>> ', product);
    try {
        await Product.create(product);
    } catch (error) {
        console.log(error);
    }
    return;
}

module.exports = { 
    getProductsByCategoryId,
    getBestsellers,
    getProductByProductId,
    addProductData
}