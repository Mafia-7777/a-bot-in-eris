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
            description: `Help you use me`,

        });
    };


    async runCmd(msg, args, data) {

        let embed = {
            title: `Help menu [${this.bot.cmds.size}]`,
            color: this.bot.colors.main,
            fields: []
        }
        let Categorys = [];
        if(!args[0]){
            await this.bot.cmds.forEach(cmd => {
                if(!Categorys.includes(cmd.cmd.category)){
                    Categorys.push(cmd.cmd.category)
                }
            })
            await Categorys.forEach(async cat => {
                let cmdsWithCat = [];
                await this.bot.cmds.forEach(cmd => {
                    if(cmd.cmd.category == cat){
                        cmdsWithCat.push(cmd.cmd.name);
                    }
                })
                embed.fields.push({name: cat, value: `\`${cmdsWithCat.join("`, `")}\``})
            })
            
        }
        



        msg.channel.send({embed: embed})
    };


};