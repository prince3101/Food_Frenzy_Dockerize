const mongoose = require("mongoose");

// const mongoHost = process.env.MONGO_HOST || 'localhost';
// const mongoPort = process.env.MONGO_PORT || '27018';
// const dbName = process.env.MONGO_DB_NAME || "food_frenzy";

// const connectionToDB = () => {
//   mongoose
//     .connect(`mongodb://${mongoHost}:${mongoPort}/${dbName}`, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(console.log("connect to db"))
//     .catch((err) => console.log("error from db connection", err));
// };

const connectionToDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("connect to db"))
    .catch((err) => console.log("error from db connection", err));
};

module.exports = connectionToDB;
