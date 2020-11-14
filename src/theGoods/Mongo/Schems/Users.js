const mongo = require("mongoose");
const User = new mongo.Schema({
    id: { type: String },
    cmdsUsed: { type: Number, default: 0 },
    prem: { type: Boolean, default: false }
})
module.exports = mongo.model("Users", User);