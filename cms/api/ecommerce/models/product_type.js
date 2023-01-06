const mongoose = require("mongoose");


const typeSchema = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true,
    },
    shippable: {
        type: Boolean,
        default: false
    },
    weight: {
        type: Number,
        default: 0
    },
    sub_product: {
        type: Boolean,
        default: false
    },
    sub_products: [{
        type: String,
        ref: "ProductType"
    }],
    attributes: [{
      field: {
          type: String,
          required: true
      },
      name: {
          type: String,
          required: true
      },
      description: String,
      rules: Object
    }]
  },
  //for storing the update and create time
  { timestamps: true }
);



module.exports = mongoose.model("ProductType", typeSchema);