const { renderMainPage, renderHowItWorks, renderCheckout } = require('./controller');
const { INDEX_ROUTE, HOW_IT_WORKS, CHECKOUT } = require('./constants');

module.exports = (app) => {
    app.get(INDEX_ROUTE, renderMainPage),
    app.get(HOW_IT_WORKS, renderHowItWorks),
    app.get(CHECKOUT, renderCheckout)
}