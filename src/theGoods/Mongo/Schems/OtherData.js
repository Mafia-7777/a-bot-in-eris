const mongo = require("mongoose");
const otherData = new mongo.Schema({
    id: { type: String, default: "otherData" },
    totalCmdsUsed: { type: Number, default: 0 },
})
module.exports = mongo.model("otherData", otherData);