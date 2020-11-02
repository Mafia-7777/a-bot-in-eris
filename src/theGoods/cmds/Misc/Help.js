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
            description: `Shows you the help menu to learn how to use me`,

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
            msg.channel.send({embed: embed})

            
        }else if(args[0]){
            let cmd = await this.bot.cmds.get(args[0].toLowerCase()) || this.bot.alli.get(args[0].toLowerCase())

            if(cmd){
                msg.channel.send({embed: {
                    title: cmd.cmd.name,
                    description: `\`${cmd.cmd.description}\``,
                    color: this.bot.colors.main,
                    fields: [
                        {
                            name: `Usage`,
                            value: `\`${data.server.config.prefix}${cmd.cmd.usage}\``,
                            inline: false,
                        },
                        {
                            name: `Category`,
                            value: `\`${cmd.cmd.category}\``,
                            inline: true
                        },
                        {
                            name: `Bot permission(s)`,  
                            value: `\`${cmd.cmd.bPerms.join("`, `")|| "embedLinks" }\``,
                            inline: true
                        },
                        {
                            name: `Member permissions(s)`,
                            value: `\`${cmd.cmd.mPerms.join(" ") || "sendMessages"}\``,
                            inline: true
                        }
                    ]
                }})
            }else{
                msg.channel.sendErrEmbed(`***${args[0]}*** is not a command`)
            }
            console.log(cmd)
        }
        



        
    };


};