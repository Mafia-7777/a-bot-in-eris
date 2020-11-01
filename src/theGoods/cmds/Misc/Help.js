const cmd = require("../../cmd");

module.exports = class Help extends cmd{
    constructor(Bot){
        super(Bot, {
            name: `help`,
            alli: [],
            category: `Misc`,
            usage: `help [ command ]`,
            bPerms: ["embedLinks"],
            mPerms: ["sendMessages"],
            cooldown: 1500,
            description: `Help you use me`

        });
    };


    async cmdRun(msg, args, data) {
        console.log("testetest")
    }


};