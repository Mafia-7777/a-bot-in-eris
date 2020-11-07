const cmd = require("../../cmd");
const fetch = require("node-fetch");
module.exports = class Help extends cmd{
    constructor(Bot){
        super(Bot, {
            name: "chat-bot",
            alli: [],
            category: `Fun`,
            usage: `chat-bot < message >`,
            bPerms: ["sendMessages"],
            mPerms: ["sendMessages"],
            cooldown: 1500,
            description: `The bot will try to talk like a person`,

        });
    };


    async runCmd(msg, args, data) {

        if(!args[0]) return msg.channel.sendErrEmbed("What would you like to tell me?")
        fetch(`https://some-random-api.ml/chatbot?message=${args.join(" ")}`, {
            method: "get",
        }).then(j => j.json()).then(json => {
            msg.channel.send({
                content: json.response,
                allowedMentions: []
            })
        })



    };


};
