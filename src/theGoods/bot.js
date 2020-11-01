const eris = require("eris");

module.exports = class Bot extends eris.Client{
    constructor(token, options){
        super(token, options);

        this.cmds = new Map();
        this.alli = new Map();
    
    };

    loadCmd(cmdPath){

        try{
            const file = new (require(cmdPath))(this);
            this.cmds.set(file.cmd.name, file);
            file.cmd.alli.forEach(alli => {
                this.alli.set(alli, file);
            })
        }catch(err){
            console.log(`Can not load command @ ${cmdPath}. ${err}`)
        }

    };

};