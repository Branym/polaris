const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    product_type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: Array
    },
    description: {
        type: Object,
        required: false
    },
    media: [{
        type: String
    }],
    variants: [{
        name: {
            type: String,
            required: true
        },
        sku: {
            type: String,
            required: true
        },
        media: [{
            type: String
        }],
        weight: Number,
        dimensions: String,
        stock: {
            type: Object,
            required: true
        }
    }]
  },
  //for storing the update and create time
  { timestamps: true }
);



module.exports = mongoose.model("Product", productSchema);