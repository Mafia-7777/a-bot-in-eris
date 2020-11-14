const cmd = require("../../cmd");
const os = require("os");
const core = os.cpus()[0]
const prettyMs = require("pretty-ms");
const packageJSON = require("../../../../package.json")
module.exports = class Help extends cmd{
    constructor(Bot){
        super(Bot, {
            name: "ping",
            alli: [],
            category: "Misc",
            usage: "ping",
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


        let embed = {
            color: this.bot.colors.main,
            author: {
                icon_url: msg.author.avatarURL,
                name: msg.author.username
            },
            description: `
            **WebSocket**: ${msg.channel.guild.shard.latency} ms
            **Database**: ${dbPing} ms
            `,
            footer: {
                text: `Total used commands: ${otherData.totalCmdsUsed}`
            }
        }   



        msg.channel.send({embed: embed})
        
    };


};