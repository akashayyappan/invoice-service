const express = require("express");
const globalRouter = require("./routers/globalrouters");

const port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
const ip = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

require("./db/db");

const app = express();


app.use(express.json());
app.use("/", globalRouter);

app.listen(port, ip);

module.exports = app;