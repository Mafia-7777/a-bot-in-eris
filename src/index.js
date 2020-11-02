require("dotenv").config();

const util = require("util");
const fs = require("fs");

const Client = require("./theGoods/bot");
const { connect } = require("./theGoods/Mongo/connect");

const bot = new Client(process.env.botToken, {
    restMode: true,
    disableEvents: {
        CHANNEL_CREATE: true,
        CHANNEL_DELETE: true,
        CHANNEL_UPDATE: true,
        GUILD_BAN_ADD: true,
        GUILD_BAN_REMOVE: true,
        GUILD_CREATE: true,
        GUILD_DELETE: true,
        GUILD_MEMBER_ADD: true,
        GUILD_MEMBER_REMOVE: true,
        GUILD_MEMBER_UPDATE: true,
        GUILD_ROLE_CREATE: true,
        GUILD_ROLE_UPDATE: true,
        GUILD_UPDATE: true,
        MESSAGE_CREATE: true,
        MESSAGE_DELETE: true,
        MESSAGE_DELETE_BULK: true,
        MESSAGE_UPDATE: true,
        PRESENCE_UPDATE: true,
        TYPING_START: true,
        USER_UPDATE: true,
        VOICE_STATE_UPDATE: true
        
    }

})



const init = async () => {
    const cmdDirs = await util.promisify(fs.readdir)(__dirname + "/theGoods/cmds/");
    cmdDirs.forEach(async dir => {
        let files = await util.promisify(fs.readdir)(__dirname + "/theGoods/cmds/" + dir);
        files.forEach(file => {
            bot.loadCmd(`./cmds/${dir}/${file}`);
        })
    })

    const eventFiles = await util.promisify(fs.readdir)(__dirname + "/theGoods/events/");
    eventFiles.forEach(file => {
        bot.loadEvent(`./events/${file}`, bot);
    })

}

init()
connect()


bot.connect()