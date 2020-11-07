const mongo = require("mongoose");
const User = new mongo.Schema({
    id: { type: String },
    cmdsUsed: { type: Number, default: 0 }
})
module.exports = mongo.model("Users", User);