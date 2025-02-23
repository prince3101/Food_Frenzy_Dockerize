const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: false,
    },
    last_name: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [4, "Password should be greater than 4 characters"],
    },
  },
  {
    timestamps: true,
  }
);

//  Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// compare password
userSchema.statics.comparePassword = async function (enteredPassword, password) {
  return await bcrypt.compare(enteredPassword, password);
};

module.exports = mongoose.model("User", userSchema);
