const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Project = require("../model/project");

router.post("/create", auth, async (req,res) => {
    if(req.isError){
        res.status(401).send(req.errorMsg);
    }else{
        try{
            project = new Project(req.body);
            await project.save();
            await project.addProjectToUser(req.res,project);
            res.status(200).send(project);
        } catch(err) {
            res.status(400).send({ error: err.errmsg });
        }
    }
})

router.post("/update", auth, async (req,res) => {
    if(req.isError){
        res.status(401).send(req.errorMsg);
    }else{
        try{
            const project = await Project.updateProject(req.body.name, req.body.jsonData);
            res.status(200).send(project);
        } catch (err) {
            res.status(400).send({ error: err.errmsg });
        }
    }
})

router.post("/find", auth, async (req,res) => {
    if(req.isError){
        res.status(401).send(req.errorMsg);
    } else {
        try{
            const project = await Project.findOne(req.body);
            res.status(200).send(project);
        } catch(err) {
            res.status(400).send({ error: err.errMsg });
        }
    }
})

module.exports = router;