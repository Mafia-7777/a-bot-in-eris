const cmd = require("../../cmd");

module.exports = class Help extends cmd{
    constructor(Bot){
        super(Bot, {
            name: `help`,
            alli: ["helpme"],
            category: `Misc`,
            usage: `help [ command ]`,
            bPerms: ["embedLinks"],
            mPerms: ["sendMessages"],
            cooldown: 1500,
            description: `Help you use me`

        });
    };


    async runCmd(msg, args, data) {
        msg.channel.send("hello")
    }


};