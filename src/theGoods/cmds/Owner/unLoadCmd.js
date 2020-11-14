const cmd = require("../../cmd");
const { inspect } = require("util");


module.exports = class Help extends cmd{
    constructor(Bot){
        super(Bot, {
            name: "unloadcmd",
            alli: [],
            category: "Owner",
            usage: "unloadcmd < cmd >",
            bPerms: ["embedLinks", "sendMessages"],
            mPerms: ["sendMessages"],
            cooldown: 0,
            description: "unload a command",
        });
    };


    async runCmd(msg, args, data) {
        let cmdName = args[0].toLowerCase();
        let unLoaded = await this.bot.unLoadCmd(cmdName);
        if(!unLoaded) return msg.channel.sendErrEmbed("Please provide a valid command name");
        console.log(unLoaded)
        msg.channel.sendSucEmbed(`Unloaded the command \`${unLoaded.name}\`, Allis \`${unLoaded.alli.join("`, `") || "None"}\`\n\
        Unloaded cmds size: ${this.bot.unLoadedCmds.size}`)

    };


};