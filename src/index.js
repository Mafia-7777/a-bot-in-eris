const Client = require("./theGoods/bot");

require("dotenv")
const bot = new Client(process.env.botToken, {
    restMode: true
})
require("./theGoods/cmds/Misc/Help")
bot.loadCmd("./cmds/Misc/Help")
