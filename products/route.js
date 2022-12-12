const { getProducts,
    getAllBestsellers,
    getProductById,
    renderProducts,
    renderBestsellers,
    renderProduct,
    addProduct,
    addProductData,
} = require('./controller');

const { PRODUCTS,
    PRODUCTS_BY_CATEGORY_ID,
    BESTSELLERS,
    BESTSELLERS_DATA,
    PRODUCT,
    PRODUCT_BY_PRODUCT_ID, 
    ADD_PRODUCT,
    ADD_PRODUCT_DATA
} = require('./constants');

module.exports = (app) => {
    app.get(PRODUCTS, renderProducts),
    app.get(BESTSELLERS, renderBestsellers),
    app.get(PRODUCT, renderProduct),
    app.get(PRODUCTS_BY_CATEGORY_ID, getProducts),
    app.get(BESTSELLERS_DATA, getAllBestsellers),
    app.get(PRODUCT_BY_PRODUCT_ID, getProductById),
    app.get(ADD_PRODUCT, addProduct),
    app.post(ADD_PRODUCT_DATA, addProductData)
}