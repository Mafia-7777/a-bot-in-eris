const mongo = require("mongoose");
const otherData = new mongo.Schema({
    id: { type: String, default: "otherData" },
    totalCmdsUsed: { type: Number, default: 0 },
    blackList: {
        users: { type: Array, default: [] },
        guilds: { type: Array, default: [] }
    }
})
module.exports = mongo.model("otherData", otherData);