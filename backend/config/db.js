const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Error:", err));
};


module.exports = connectToDb;