const cmd = require("../../cmd");

module.exports = class Help extends cmd{
    constructor(Bot){
        super(Bot, {
            name: "test",
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
        let url = await this.bot.getLastChannelImage(msg.channel)
        let img = await this.bot.ImageManipulation.sepia(url)
        msg.channel.send("", {name: "Sepia.png", file: img})
        
        //ImageManipulation
    };


};