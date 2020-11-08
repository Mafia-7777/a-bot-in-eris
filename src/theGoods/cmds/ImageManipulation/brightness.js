const cmd = require("../../cmd");

module.exports = class Help extends cmd{
    constructor(Bot){
        super(Bot, {
            name: "brightness",
            alli: [],
            category: "ImageManipulation",
            usage: "brightness < val > [ user ]",
            bPerms: ["attachFiles"],
            mPerms: ["sendMessages"],
            cooldown: 5000,
            description: "Change the brightness of a image",
        });
    };


    async runCmd(msg, args, data) {

        let val = (args[0]);
        if(!val) return msg.channel.sendErrEmbed("Please tell me a level to change the brightness on a image")
        val = Number(val)
        if(!val) return msg.channel.sendErrEmbed("Your brightness level must be a number")

        let user = msg.mentions[0] || await msg.channel.guild.members.find(x => x.username.toLowerCase() == args.slice(1).join(" ").toLowerCase()) || await this.bot.users.get(args[1]);
        let imgURl;
        if(user){
            imgURl = user.staticAvatarURL;
        }else{
            imgURl = await this.bot.getLastChannelImage(msg.channel);
        }

        if(!imgURl) return msg.channel.sendErrEmbed("I could not find an image in this channel")

        let Iserr = null
        let file = await this.bot.ImageManipulation.brightness(imgURl, val).catch(err => {
            Iserr = err.message
        })
        if(Iserr != null) return msg.channel.sendErrEmbed(`${Iserr}\n[Support server](${this.bot.config.SupportServer})`)

        msg.channel.send("", {name: "Brightness.png", file: file});
        
    };


}; 