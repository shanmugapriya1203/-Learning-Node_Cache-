const mongoose = require("mongoose");

const dbConfig = async () => {
  try {
    const connect = await mongoose.connect("mongodb://localhost:27017");
    console.log(`Mongodb connected succesfully`);
  } catch (error) {
    console.log(`MOngoDB is connected`);
    process.exit(1);
  }
};

module.exports = dbConfig;
