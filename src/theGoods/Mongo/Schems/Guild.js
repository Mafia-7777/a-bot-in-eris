const mongo = require("mongoose");
const config = require("../../../../config.json");
const Guilds = new mongo.Schema({
    id: { type: String },
    config: {
        prefix: { type: String, default: config.defaultPrefix }
    },
})
module.exports = mongo.model("Guilds", Guilds)