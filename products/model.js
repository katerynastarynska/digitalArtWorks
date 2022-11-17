const { getConnection, Schema, mongoose } = require("../database/database");
getConnection();

const productSchema = new Schema({
    image: {
        type: String,
        required: true,
    },
    title: String,
    price: Number,
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    },
    isBestseller: Boolean,
    options: Array,
    quantity: Number,
    personalization: String,
    description: String,
});

const Product = mongoose.model('Product', productSchema);
console.log(Product);

module.exports = Product;