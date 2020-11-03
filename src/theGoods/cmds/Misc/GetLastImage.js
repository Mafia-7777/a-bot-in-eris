const cmd = require("../../cmd");

module.exports = class Help extends cmd{
    constructor(Bot){
        super(Bot, {
            name: `get-last-attachment`,
            alli: ["getlastattachment"],
            category: `Misc`,
            usage: `get-last-attachment`,
            bPerms: ["attachFiles"],
            mPerms: ["sendMessages"],
            cooldown: 30000,
            description: `Finds the last attachment in the channel downloads it then and then sends it`,

        });
    };


    async runCmd(msg, args, data) {

        try{
            let attchment = await this.bot.getLastChannelAttachment(msg.channel);
            if(attchment == null) return msg.channel.sendErrEmbed("I could not find a image in this channel")
            let vid = await this.bot.downLoadVideo(attchment.url);
            msg.channel.send("", {file: vid, name: `${attchment.filename}`});
        }catch(err){
            this.bot.logger.yellow(`${err}\n${__filename}`);
            msg.channel.sendErrEmbed("An error as happened, Try again?");
        }
        



        
    };


};