const cmd = require("../../cmd");

module.exports = class Help extends cmd{
    constructor(Bot){
        super(Bot, {
            name: "bl-user",
            alli: [],
            category: "Owner",
            usage: "bl-user < user >",
            bPerms: ["embedLinks"],
            mPerms: ["sendMessages"],
            cooldown: 0,
            description: "Manage the user black-list",
        });
    };


    async runCmd(msg, args, data) {

        let user = await msg.mentions[0] ? this.bot.users.get(msg.mentions[0].id) : null || this.bot.users.get(args[0])
        if(!user) return msg.channel.sendErrEmbed("Please give me a valid user")

        if(!data.otherData.blackList.users.includes(user.id)){
            data.otherData.blackList.users.push(user.id);
            await data.otherData.save();
            msg.channel.sendSucEmbed(`<@!${user.id}>, ${user.username}, was **blackListed**`)
        }else{
            let newUsers = data.otherData.blackList.users.filter(x => x != user.id);
            data.otherData.blackList.users = newUsers;
            await data.otherData.save();
            msg.channel.sendSucEmbed(`<@!${user.id}>, ${user.username}, was **whiteListed**`)
        }

        
    };


};