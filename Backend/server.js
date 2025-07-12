const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./Config/connectDb");
const path = require("path");

//config dot env file
dotenv.config();

//database call
connectDb();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
//routes
//user routes
app.use("/api/v1/users", require("./Routes/userRoute"));
//trans. routes
app.use("/api/v1/transactions", require("./Routes/transactionRoutes"));

//static file
// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

//port
const PORT = process.env.PORT  || 8080 ;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
