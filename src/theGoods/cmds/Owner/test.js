const cmd = require("../../cmd");

module.exports = class Help extends cmd{
    constructor(Bot){
        super(Bot, {
            name: "test",
            alli: [],
            category: "Owner",
            usage: "test",
            bPerms: ["embedLinks"],
            mPerms: ["sendMessages"],
            cooldown: 0,
            description: "See the blacklist",
        });
    };


    async runCmd(msg, args, data) {
        
    };


};