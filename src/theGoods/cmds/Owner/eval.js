const cmd = require("../../cmd");
const { inspect } = require("util");


module.exports = class Help extends cmd{
    constructor(Bot){
        super(Bot, {
            name: "eval",
            alli: [],
            category: "Owner",
            usage: "eval < code >",
            bPerms: ["embedLinks", "sendMessages"],
            mPerms: ["sendMessages"],
            cooldown: 0,
            description: "Eval some code",
        });
    };


    async runCmd(msg, args, data) {
        let bot = this.bot;
        async function EVAL(code){
            let hasAwait = code.includes("await");
            let evaled = await hasAwait ? eval(`(async () => { ${code} })()`) : eval(code);
            if(typeof evaled != "string"){
                evaled = inspect(evaled, {
                    depth: +!(inspect(evaled, { depth: 1 }))
                });
            }
            return evaled;
        }


        let input = args.join(" ");
        if(!input) return msg.channel.sendErrEmbed("I need code to eval duh");

        let embed = {
            title: `Eval`,
            color: this.bot.colors.green,
            footer: {}
        }

        let start = Date.now();
        try{
            let evaled = await EVAL(input);

            if(evaled.includes(this.bot.token)) return msg.channel.sendErrEmbed("Bruh this got my token in it")

            if(evaled.length > 2000){
                let binKey = await this.bot.postBin(evaled);
                return msg.channel.send(`https://hasteb.in/${binKey}.js`);
            }else{
                embed.description = `\`\`\`${evaled}\`\`\``;
                embed.footer.text = `Finished in ${Date.now() - start} ms`;
                return msg.channel.send({embed: embed});
            }
        
        }catch(err){
            embed.title = "Eval err"
            embed.footer.text = `Finished in ${Date.now() - start} ms`;
            embed.description = `\`\`\`${err}\`\`\``;
            embed.color = this.bot.colors.red;
            msg.channel.send({embed: embed})
        }
       
    };


};