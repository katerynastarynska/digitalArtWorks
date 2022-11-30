const service = require('./service');
const path = require('path');

async function getCategories(req, res) {
    let categories;
    try {
        categories = await service.getCategory()
        console.log('categories -> ', categories);
        res.json(categories);
        res.end();
    } catch (error) {
        res.status(400).json({
            error: error
        })
        return;
    }
}

async function renderCategories(req, res) {
    console.log('access route categories /, METHOD = GET')
    res.sendFile(path.join(__dirname, '../client/categories.html'))
}

module.exports = {
    getCategories,
    renderCategories
}