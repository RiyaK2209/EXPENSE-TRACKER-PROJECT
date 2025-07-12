const mongoose = require('mongoose');
const colors = require('colors');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      ssl: true,
      tlsAllowInvalidCertificates: true, // ADD THIS
    });
    console.log(`Server Running On ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`${error}`.bgRed);
  }
};

module.exports = connectDb;
