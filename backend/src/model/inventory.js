const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    is_veg: {
      type: Boolean,
      default: true
    },
    item: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("inventory", inventorySchema);
