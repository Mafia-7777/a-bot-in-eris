module.exports = class{
    constructor(bot){
        this.bot = bot;
    }

    async run(msg){
        if(msg.author.bot) return;

        let args = msg.content.split(" ")

        let cmd = await this.bot.cmds.get(args[0]) || await this.bot.alli.get(args[0])
        if(cmd) cmd.runCmd(msg, args)
    }
}