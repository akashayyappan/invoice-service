const express = require("express");
const globalRouter = require("./routers/globalrouters");
const cors = require("cors");

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

require("./db/db");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/", globalRouter);

app.listen(port, () => {
    console.log(`Server running in port ${port}`);
})