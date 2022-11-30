const { getProducts,
    getAllBestsellers,
    getProductById,
    renderProducts,
    renderBestsellers,
    renderProduct,
} = require('./controller');

const { PRODUCTS,
    PRODUCTS_BY_CATEGORY_ID,
    BESTSELLERS,
    BESTSELLERS_DATA,
    PRODUCT,
    PRODUCT_BY_PRODUCT_ID } = require('./constants');

module.exports = (app) => {
    app.get(PRODUCTS, renderProducts),
    app.get(BESTSELLERS, renderBestsellers),
    app.get(PRODUCT, renderProduct),
    app.get(PRODUCTS_BY_CATEGORY_ID, getProducts),
    app.get(BESTSELLERS_DATA, getAllBestsellers),
    app.get(PRODUCT_BY_PRODUCT_ID, getProductById)
}