const data = {};
module.exports = class{
    constructor(bot){
        this.bot = bot;
    }

    async run(msg){
        if(msg.author.bot) return;
        data.server = await this.bot.getData(msg.channel.id);
        if(!msg.content.startsWith(data.server.config.prefix)) return;

        let userCmd = msg.content.toLowerCase().split(" ")[0].slice(data.server.config.prefix.length);
        let args = msg.content.slice(userCmd.length + 2).split(" ")

        let cmdFile = await this.bot.cmds.get(userCmd)
        if(!cmdFile) return;

        try{
            cmdFile.runCmd(msg, args, data)
        }catch(err){
            this.bot.logger.red(err)
        }
    }
}