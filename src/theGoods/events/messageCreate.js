const data = {};
const prettyMs = require("pretty-ms")
module.exports = class{
    constructor(bot){
        this.bot = bot;
        this.cooldown = this.bot.cooldown
    }

    async handleCooldown(id, cmd, msg){
        let coolDown = await this.cooldown.get(`${id}_${cmd.cmd.name}`);
        console.log(coolDown)
        if(coolDown){
            return msg.channel.sendErrEmbed(`You are in cooldown still, Time left: ${prettyMs(cmd.cmd.cooldown - (Date.now() - coolDown) )}`)
        }else{
            this.cooldown.set(`${id}_${cmd.cmd.name}`, Date.now());
            setTimeout(() => {
                this.cooldown.delete(`${id}_${cmd.cmd.name}`)
            }, cmd.cmd.cooldown);
        }
    }

    async runEvent(msg){
        if(msg.author.bot) return;
        data.server = await this.bot.getGuildData(msg.channel.id);
        if(!msg.content.startsWith(data.server.config.prefix)) return;

        let userCmd = msg.content.toLowerCase().split(" ")[0].slice(data.server.config.prefix.length);
        let args = msg.content.slice(userCmd.length + 2).split(" ")

        let cmdFile = await this.bot.cmds.get(userCmd)
        if(!cmdFile) return;

        let inCooldown = await this.handleCooldown(msg.author.id, cmdFile, msg);
        if(inCooldown) return;

    

        try{
            cmdFile.runCmd(msg, args, data)
        }catch(err){
            this.bot.logger.red(err)
        }
    }
}