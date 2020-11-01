module.exports = class Cmd{
    constructor(Bot, {
        name = new String(),
        alli = new Array(),
        category = new String(),
        description = new String(),
        usage = new String(),

        cooldown = new Number(),

        bPerms = new Array(),
        mPerms = new Array(),
        
    }) {
        this.bot = Bot;
        this.cmd = {name, alli, bPerms, mPerms, cooldown, category, description, usage}
    }
}