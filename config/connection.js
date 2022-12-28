const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/social-network",
  {
    useNewurlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Server is connected to MongoDB");
  }
);

// mongoose.set("debug", true);

module.exports = mongoose.connection;
