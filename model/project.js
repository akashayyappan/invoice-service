const mongoose = require("mongoose");
const User = require("./user")

const projectSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    jsonData: {
        type: JSON
    },
    createdOn:{
        type: Date,
        default: Date.now()
    },
    updatedOn: {
        type: Date
    }
});

projectSchema.methods.addProjectToUser = async (_user, _project) => {
    const user = await User.findOne(_user);
    user.projects = user.projects.concat({
        projectID: _project._id,
        projectName: _project.name
    })
    await user.save();
}

projectSchema.statics.updateProject = async (name,jsonData) => {
    const project = await Project.findOne({ name: name });
    project.jsonData = jsonData;
    project.updatedOn = Date.now();
    await project.save();
    return project;
}

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;