module.exports = class{
    constructor(bot){
        this.bot = bot;

    }

    async runEvent(msg){
        this.bot.snipes.set(msg.channel.id, {
            tag: msg.author.tag ? msg.author.tag : null,
            av: msg.author.avatarURL ? msg.author.avatarURL : null,
            content: msg.content ? msg.content : null,
            img: msg.attachments[0] ? msg.attachments[0].proxy_url : null
        })

        setTimeout(() => {
            if(this.bot.snipes.get(msg.channel.id)) this.bot.snipes.delete(msg.channel.id)
        }, 30000);
    }

}