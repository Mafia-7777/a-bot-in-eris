const cmd = require("../../cmd");

module.exports = class Help extends cmd{
    constructor(Bot){
        super(Bot, {
            name: "bl-server",
            alli: [],
            category: "Owner",
            usage: "bl-server < server >",
            bPerms: ["embedLinks"],
            mPerms: ["sendMessages"],
            cooldown: 0,
            description: "Manage the server black-list",
        });
    };


    async runCmd(msg, args, data) {

        let server = await this.bot.guilds.get(args[0]) || msg.channel.guild;

        if(!data.otherData.blackList.guilds.includes(server.id)){
            data.otherData.blackList.guilds.push(server.id);
            await data.otherData.save();
            msg.channel.sendSucEmbed(`${server.id}, ${server.name}, was **blackListed**`)
        }else{
            let newServers = data.otherData.blackList.guilds.filter(x => x != server.id);
            data.otherData.blackList.guilds = newServers;
            await data.otherData.save();
            msg.channel.sendSucEmbed(`${server.id}, ${server.name}, was **whiteListed**`)
        }

        
    };


};