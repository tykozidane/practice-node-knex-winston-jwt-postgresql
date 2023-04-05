const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const barangRoutes = require("./routes/barang");
const authRoutes = require("./routes/auth");
// const morganMiddleware = require("./middleware/morgan.middleware");
const uuid = require("uuid");
const Logger = require("./middleware/logger");

// const client = require('./connection')
const app = express();

var corsOption = {
  origin: "http://localhost:3100",
};

// app.use(morganMiddleware)
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//logging
app.use((req, res, next) => {
  req.headers.idReq = uuid.v4();
  next();
});
app.use(Logger.request);
app.use(Logger.response);

const PORT = process.env.PORT || 3100;
app.listen(3100, () => {
  console.log("Server running in port 3100");
});

// client.connect(err => {
//     if(err){
//         console.log(err.message)
//     } else {
//         console.log("Database Connected")
//     }
// })

app.use("/api/barang", barangRoutes);
app.use("/api/auth", authRoutes);
