const collection = require("../db/db");

let user = {};

user.createUser = (user) => {
    return collection.getUserCollection().then((model) => {
        return model.create(user).then((res) => {
            return res;
        }).catch((err) => {
            throw err;
        })
    })
}

module.exports = user;