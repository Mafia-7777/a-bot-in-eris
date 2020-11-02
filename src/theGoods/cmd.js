module.exports = class Cmd{
    constructor(Bot, {
        name = new String(),
        alli = new Array(),
        category = "Other",
        description = "None was givin",
        usage = "None was givin",

        cooldown = 1500,

        bPerms = new Array(),
        mPerms = new Array(),

        nsfw = false
        
    }) {
        this.bot = Bot;
        this.cmd = {name, alli, bPerms, mPerms, cooldown, category, description, usage, nsfw}
    }
}