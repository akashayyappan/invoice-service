const express = require("express");
const userRouter = require("./user");

const router = express.Router();

router.get("/", (req,res) => {
    res.status(200).send("service works fine");
})

router.use("/user",userRouter);

module.exports = router;