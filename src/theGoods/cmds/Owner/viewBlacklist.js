const cmd = require("../../cmd");

module.exports = class Help extends cmd{
    constructor(Bot){
        super(Bot, {
            name: "view-bl",
            alli: [],
            category: "Owner",
            usage: "view-bl",
            bPerms: ["embedLinks"],
            mPerms: ["sendMessages"],
            cooldown: 0,
            description: "See the blacklist",
        });
    };


    async runCmd(msg, args, data) {

        msg.channel.send({embed: {
            title: "blackList",
            color: this.bot.colors.main,
            description: `
            **__Users__**
            ${data.otherData.blackList.users.join(", ") || "None"}
            **__Servers__**
            ${data.otherData.blackList.guilds.join(", ") || "None"}`
        }})

        
    };


};