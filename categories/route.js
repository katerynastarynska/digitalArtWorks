const {  getCategories, renderCategories } = require('./controller');
const { CATEGORIES, CATEGORIES_DATA } = require('./constants');

module.exports = (app) => {
    app.get(CATEGORIES, renderCategories),
    app.get(CATEGORIES_DATA, getCategories)
}