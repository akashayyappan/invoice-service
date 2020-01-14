const express = require("express");
const router = express.Router();
const User = require("../model/user")
const auth = require("../middleware/auth")

router.post("/register",async (req,res) => {
    try{
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ "id":user._id, "name":user.name, "email":user.email, token })
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
        res.send({ "id":user._id, "name":user.name, "email":user.email, token });
    } catch(err) {
        res.status(400).send(err);
    }
})

router.post("/findprojects", auth, async (req,res) => {
    if(req.isError){
        res.status(401).send(req.errorMsg);
    }else{
        try{
            const projects = await User.findProjects(req.res);
            res.status(200).send(projects);
        } catch(err) {
            res.status(401).send({ error: err.errmsg });
        }
    }
})

router.get('/check', auth, (req,res) => {
    if(req.isError){
        res.status(401).send(req.errorMsg);
    } else {
        res.status(200).send(req.res)
    }
})

module.exports = router;