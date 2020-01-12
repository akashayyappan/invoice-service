const express = require("express");
const router = express.Router();
const User = require("../model/user")
const auth = require("../middleware/auth")

router.post("/register",async (req,res) => {
    try{
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ "name":user.name, "email":user.email, token })
    } catch(err) {
        res.status(400).send(err);
    }
})

router.post("/login", async(req,res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if(!user){
            return res.status(401).send({ error: "Login Failed! Check Credentials" });
        }
        const token = await user.generateAuthToken();
        res.send({ "name":user.name, "email":user.email, token });
    } catch(err) {
        res.status(400).send(err);
    }
})

router.get('/check', auth)

module.exports = router;