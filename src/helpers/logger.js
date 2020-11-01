const chalk = require("chalk");
module.exports = class Logger{
    constructor(bot, webHookID, webHookToken){
        this.bot = bot;
        this.webHookID = webHookID;
        this.wehHookToken = webHookToken;
    }

    green(log){
        console.log(chalk.green(`${new Date} ${log}`))
    }

    lightGreen(log){
        console.log(chalk.greenBright(`${new Date} ${log}`))
    }

    yellow(log){
        console.log(chalk.yellow(`${new Date} ${log}`))
    }

    red(log){
        console.log(chalk.red(`${new Date} ${log}`))
    }
}