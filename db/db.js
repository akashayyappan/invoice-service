const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://adminUser:mongoDBpassWord@invoice-29otw.mongodb.net/ash-database?retryWrites=true&w=majority", {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).catch(err => console.log(err))