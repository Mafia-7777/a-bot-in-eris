require("dotenv").config();

const eris = require("eris");
const logger = require("../helpers/logger");

const mongo = require("mongoose");
const Guilds = require("./Mongo/Schems/Guild");

module.exports = class Bot extends eris.Client{
    constructor(token, options){
        super(token, options);
        
        this.cmds = new Map();
        this.alli = new Map();

        this.logger = new logger(this, process.env.logWebHookId, process.env.logWebhookToken);
        this.config = require("../../config.json");
        this.colors = require("../../colors")
    
    };

    loadCmd(cmdPath){

        try{
            const file = new (require(cmdPath))(this);
            this.cmds.set(file.cmd.name, file);
            file.cmd.alli.forEach(alli => {
                this.alli.set(alli, file);
            })
            this.logger.green(`Loaded command: ${file.cmd.name}`)
        }catch(err){
            this.logger.yellow(`Can not load command @ ${cmdPath}, ${err}`)
        }

    };

    loadEvent(eventPath, bot){
        try{
            let eventFile = new (require(eventPath))(this);
            let eventName = eventPath.split("/")[2].split(".")[0]
            bot.on(eventName, (...args) => eventFile.run(...args))
            this.logger.lightGreen(`Event loaded: ${eventName}`)
        }catch(err){
            this.logger.yellow(`Can not load command @ ${eventPath}, ${err}`)
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

    async getData(guildID){
        let data = await Guilds.findOne({id: guildID})
        if(!data){
            await new Guilds({id: guildID}).save();
            data = await Guilds.findOne({id: guildID});
        }
        return data;
    }

};