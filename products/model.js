const { getConnection, Schema, mongoose } = require("../database/database");
getConnection();

const productSchema = new Schema({
    image: {
        type: String,
        required: true,
    },
    title: String,
    price: Number,
    category_id: String,
    isBestseller: Boolean,
    options: {
        type: Array,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    personalization: String,
    description: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;