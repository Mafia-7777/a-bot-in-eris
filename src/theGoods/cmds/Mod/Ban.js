const cmd = require("../../cmd");

module.exports = class Help extends cmd{
    constructor(Bot){
        super(Bot, {
            name: "ban",
            alli: [],
            category: "Moderation",
            usage: "ban < user > [ --hard-ban ]",
            bPerms: ["embedLinks", "banMembers"],
            mPerms: ["sendMessages", "banMembers"],
            cooldown: 1500,
            description: "Ban a user from a server",
        });
    };


    async runCmd(msg, args, data) {
        let user = msg.mentions[0] || await msg.channel.guild.members.find(x => x.username.toLowerCase() == args.join(" ").toLowerCase()) || msg.channel.guild.members.get(args[0])
        
        if(user){
            
            if(msg.channel.permissionsOf(user.id).has("banMembers")) return msg.channel.sendErrEmbed("I can not ban Mods/Admins");

            let isErr = null;
            await msg.channel.guild.banMember(user.id, 7, args.slice(1).join(" ")).catch(err => {
                isErr = err;
            })
            if(isErr == null){
                msg.channel.sendSucEmbed(`${user.username}#${user.discriminator} was banned, Reason: ${args.slice(1).join(" ") || "None"}`);
            }else{
                msg.channel.sendErrEmbed(`${isErr}\n[Support server](${this.bot.config.SupportServer})`);
            }
        }else{
            if(!args[0]) return msg.channel.sendErrEmbed("Please give me a id");
            if(!Number(args[0])) return msg.channel.sendErrEmbed("The id must be a number");
            let doR = null;
            await msg.channel.guild.banMember(args[0], 7, args.slice(1).join(" ") || "None").catch(err => {
                if(err == "DiscordRESTError [10013]: Unknown User") return doR = "Please give a **valid** id"
                else return doR = `${err}\n[Support server](${this.bot.config.SupportServer})`
            })
            if(doR != null) return msg.channel.sendErrEmbed(doR)

            msg.channel.sendSucEmbed(`${args[0]} was banned, Reason: ${args.slice(1).join(" ") || "None"}`)
        }

    };


};