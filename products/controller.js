const service = require('./service');
const path = require('path');

async function getProducts(req, res) {
    let products;
    try {
        products = await service.getProductsByCategoryId(req.params.categoryId);
        console.log('products -> ', products);
        res.json(products);
        res.end();
    } catch (error) {
        res.status(400).json({
            error: error
        })
        return;
    }
}

async function getAllBestsellers(req, res) {
    let bestsellers;
    try {
        bestsellers = await service.getBestsellers();
        res.json(bestsellers);
        res.end();
    } catch (error) {
        res.status(400).json({
            error: error
        })
        return;
    }
}

async function getProductById(req, res) {
    console.log('product params from controller >>>>', req.params.productId);
    let product;
    try {
        product = await service.getProductByProductId(req.params.productId);
        console.log(product);
        res.json(product);
        res.end();
    } catch (error) {
        res.status(400).json({
            error: error
        })
        return
    }
}

async function addProductData(req, res) {
    try {
        await service.addProductData(req.body);
        res.status(200);
        res.end();
    } catch (error) {
        res.status(400).json({
            error: error,
        })
    }
    return;
}

async function renderProducts(req, res) {
    console.log('access route products /, METHOD = GET')
    res.sendFile(path.join(__dirname, '../client/products.html'))
}

async function renderBestsellers(req, res) {
    console.log('access route bestsellers/, METHOD = GET')
    res.sendFile(path.join(__dirname, '../client/bestsellers.html'))
}

async function renderProduct(req, res) {
    console.log('access route products to 1 product /, METHOD = GET')
    res.sendFile(path.join(__dirname, '../client/product.html'))
}

async function addProduct(req, res) {
    console.log('access route add product /, METHOD = GET')
    res.sendFile(path.join(__dirname, '../client/add-product.html'))
}

module.exports = {
    getProducts,
    getAllBestsellers,
    getProductById,
    renderProducts,
    renderBestsellers,
    renderProduct,
    addProduct,
    addProductData,
}