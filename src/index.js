require("dotenv").config(); // .env vars

const util = require("util");
const fs = require("fs");

const Client = require("./theGoods/bot"); // imports client
const { connect } = require("./theGoods/Mongo/connect"); // imports data base connection

const bot = new Client(process.env.botToken, {

});



const init = async () => {
    const cmdDirs = await util.promisify(fs.readdir)(__dirname + "/theGoods/cmds/");
    cmdDirs.forEach(async dir => {
        let files = await util.promisify(fs.readdir)(__dirname + "/theGoods/cmds/" + dir);
        files.forEach(file => {
            bot.loadCmd(`./cmds/${dir}/${file}`);
        });
    });

    const eventFiles = await util.promisify(fs.readdir)(__dirname + "/theGoods/events/");
    eventFiles.forEach(file => {
        bot.loadEvent(`./events/${file}`, bot);
    });

}

init(); // sets cmds and allis
connect(); //Connects the data base


bot.connect(); // Connects the bot to discord