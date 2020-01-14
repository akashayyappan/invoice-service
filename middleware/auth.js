const jwt = require('jsonwebtoken')
const User = require("../model/user")

const auth = async(req, res, next) => {
    try {
    const token = req.header('Authorization').replace('Bearer ', '')
    let data;
        jwt.verify(token, "EvenDeadImTheHero",(err,decoded) => {
            if(err) throw new Error(err)
            data = decoded
        })

        const user = await User.findOne({ _id: data._id, token: token }, 'name email')
        if (!user) {
            throw new Error("Cannot find user")
        }
        req.isError = false;
        req.res = user
        next()
    } catch (error) {
        req.isError = true;
        req.errorMsg = error.message;
        next()
    }

}
module.exports = auth