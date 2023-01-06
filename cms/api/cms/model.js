const mongoose = require("mongoose");


const cmsSchema = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    collection_name: {
        type: String,
        required: true,
    },
    data: {
      type: Object, 
      required: true
    },
  },
  //for storing the update and create time
  { timestamps: true }
);



module.exports = mongoose.model("Document", cmsSchema);