const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    client_name: {
      type: String,
      required: true,
    },
    biller_name: {
      type: String,
      required: false,
    },
    table_no: {
      type: Number,
      required: true,
    },
    bill_amount: {
      type: Number,
      required: true,
    },
    payment_type: {
      type: String,
      default: "cash",
    },
    food_items: {
      type: Array,
      default: [],
    },
    payment_status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bills", billSchema);
