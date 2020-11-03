module.exports = class{
    constructor(bot){
       this.bot = bot; 
    }

    async runEvent(){
        this.bot.logger.green(`${this.bot.user.tag} is online`)
    }
}