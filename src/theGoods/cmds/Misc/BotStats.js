const cmd = require("../../cmd");
const os = require("os");
const core = os.cpus()[0]
const prettyMs = require("pretty-ms");
const packageJSON = require("../../../../package.json")
module.exports = class Help extends cmd{
    constructor(Bot){
        super(Bot, {
            name: "bot-stats",
            alli: ["bstats"],
            category: "Misc",
            usage: "bot-stats",
            bPerms: ["embedLinks"],
            mPerms: ["sendMessages"],
            cooldown: 5000,
            description: "See the bots stats",
        });
    };


    async runCmd(msg, args, data) {

        let startTime = Date.now();
        let otherData = await this.bot.getOtherData();
        let dbPing = Date.now() - startTime;

        let usedram = Number((os.freemem() / 1073741824).toFixed(3))
        let totalram = Number((os.totalmem() / 1073741824).toFixed(3))

        let embed = {
            color: this.bot.colors.main,
            author: {
                icon_url: this.bot.user.avatarURL,
                name: this.bot.user.username
            },
            description: `__***Bot***__
            \u3000 **Total used commands**: ${otherData.totalCmdsUsed}
            \u3000 **Total commnds**: ${this.bot.cmds.size}
            \u3000 **Total allieses**: ${this.bot.alli.size}
            \u3000 **Total servers**: ${this.bot.guilds.size}
            \u3000 **Total users**: ${this.bot.users.size}
            \u3000 **Version**: ${packageJSON.version}
            \u3000 **Uptime** ${prettyMs(this.bot.uptime)}
            __***Process***__
            \u3000 **Cores**: ${os.cpus().length}
            \u3000 **Speed**: ${core.speed} MHz
            \u3000 **Model**: ${core.model}
            \u3000 **Ram**: ${usedram} / ${totalram} Gb
            \u3000 **Node**: ${process.version}
            __***Ping***__
            \u3000 **WebSocket**: ${msg.channel.guild.shard.latency} ms
            \u3000 **Database**: ${dbPing} ms
            `
        }   



        msg.channel.send({embed: embed})
        
    };


};