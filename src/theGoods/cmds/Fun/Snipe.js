const cmd = require("../../cmd");
const fetch = require("node-fetch");
module.exports = class Help extends cmd{
    constructor(Bot){
        super(Bot, {
            name: "snipe",
            alli: ["sniper"],
            category: `Fun`,
            usage: `snipe`,
            bPerms: ["embedLinks"],
            mPerms: ["sendMessages"],
            cooldown: 1500,
            description: `Show you a recently deleted message in the channel`,

        });
    };


    async runCmd(msg, args, data) {
        

        let snipe = this.bot.snipes.get(msg.channel.id)
        if(!snipe) return msg.channel.sendErrEmbed("No messages have been deleted recently")
        if(snipe.content.length > 999) return msg.channel.sendErrEmbed("This snipe is to big to send here")
        let embed = {
            author: {
                name: snipe.tag,
                icon_url: snipe.av
            },
            image: {
                url: snipe.img,
            },
            description: snipe.content,
            color: this.bot.colors.main
        }
        msg.channel.send({embed: embed})

        

    };


};
