const jwt = require('jsonwebtoken')
const User = require("../model/user")

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    let data;
    try {
        jwt.verify(token, process.env.JWT_KEY,(err,decoded) => {
            if(err) res.status(401).send({error: err.message, expiredAt: err.expiredAt})
            data = decoded
        })

        const user = await User.findOne({ _id: data._id, token: token }, 'name email')
        if (!user) {
            throw new Error("Cannot find user")
        }
        res.status(200).send(user)
        next()
    } catch (error) {
        res.status(401).send({ error: error.message })
    }

}
module.exports = auth