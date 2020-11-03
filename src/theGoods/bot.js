require("dotenv").config();

const eris = require("eris");
const logger = require("../helpers/logger");

const mongo = require("mongoose");
const Guilds = require("./Mongo/Schems/Guild");
const fetch = require("node-fetch");

module.exports = class Bot extends eris.Client{
    constructor(token, options){
        super(token, options);
        
        this.cmds = new Map(); //Bot commds
        this.alli = new Map(); //Bot alias(es)
        this.cooldown = new Map(); // command cooldown

        this.logger = new logger(this, process.env.logWebHookId, process.env.logWebhookToken); //Logs
        this.config = require("../../config.json"); //Config
        this.colors = require("../../colors"); //Colors
    
    };

    loadCmd(cmdPath){ //Loads a command

        try{
            const file = new (require(cmdPath))(this);
            this.cmds.set(file.cmd.name, file);
            file.cmd.alli.forEach(alli => {
                this.alli.set(alli, file);
            });
            this.logger.green(`Loaded command: ${file.cmd.name}`);
        }catch(err){
            this.logger.yellow(`Can not load command @ ${cmdPath}, ${err}`);
        }

    };

    loadEvent(eventPath, bot){ //Loads a event
        try{
            let eventFile = new (require(eventPath))(this);
            let eventName = eventPath.split("/")[2].split(".")[0];
            bot.on(eventName, (...args) => eventFile.runEvent(...args));
            this.logger.lightGreen(`Event loaded: ${eventName}`);
        }catch(err){
            this.logger.yellow(`Can not load command @ ${eventPath}, ${err}`);
        }
    }

    async getPrefix(guildID){
        let data = await Guilds.findOne({id: guildID})
        if(!data){
            await new Guilds({id: guildID}).save();
            data = await Guilds.findOne({id: guildID});
        }
        return data.config.prefix
    }

    async getGuildData(guildID){ //Gets a guilds data from mongo
        let data = await Guilds.findOne({id: guildID})
        if(!data){
            await new Guilds({id: guildID}).save();
            data = await Guilds.findOne({id: guildID});
        }
        return data;
    }


    async getLastChannelAttachment(channel){ //
        let Imgs = [];
        let messages = await channel.getMessages();
        messages.forEach(message => {
            let push = message.attachments ? message.attachments[0] : null
            if(push == null) return;
            Imgs.push(push)
        })
        if(Imgs.length == 0) return null;
        
        return Imgs[0];
    }


    async downLoadVideo(url){
        let Fetched = await fetch(url);
        return Fetched.buffer();
    }

};