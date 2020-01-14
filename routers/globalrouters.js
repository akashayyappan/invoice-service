const express = require("express");
const userRouter = require("./user");
const projRouter = require("./project")

const router = express.Router();

router.get("/", (req,res) => {
    res.status(200).send("service works fine");
})

router.use("/user",userRouter);

router.use("/project",projRouter);

module.exports = router;