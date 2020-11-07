const cmd = require("../../cmd");

module.exports = class Help extends cmd{
    constructor(Bot){
        super(Bot, {
            name: "how-many-commands",
            alli: ["how-many-cmds", "howmanycmds"],
            category: "Misc",
            usage: "how-many-commands [ user ]",
            bPerms: ["embedLinks"],
            mPerms: ["sendMessages"],
            cooldown: 5000,
            description: "See how mnay commands someone has done",
        });
    };


    async runCmd(msg, args, data) {

        let user = msg.mentions[0] ? this.bot.users.get(msg.mentions[0].id) : null || this.bot.users.get(args[0]) || this.bot.users.find(x => x.username.toLowerCase() == args.join(" ").toLowerCase()) || msg.author;

        if(user.bot == true) return msg.channel.sendErrEmbed("Sorry, I do not think bots can use me")

        let userData = await this.bot.getUserData(user.id)
        
        msg.channel.send({embed: {
            description: `${user.username} has used one of my commands ${userData.cmdsUsed}`,
            color: this.bot.colors.main
        }})


        
    };


};