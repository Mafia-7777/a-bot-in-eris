const jimp = require("jimp");
module.exports = class{
    constructor(options){
        this.imgForm = options.defaultImageFormat;
    }

    async sepia(img){
        img = await jimp.read(img);
        img.sepia();
        return img.getBufferAsync(`image/${this.imgForm}`) 
    }

    async circle(img){
        img = await jimp.read(img);
        img.circle();
        return img.getBufferAsync(`image/${this.imgForm}`) 
    }

    async dither565(img){
        img = await jimp.read(img);
        img.dither565();
        return img.getBufferAsync(`image/${this.imgForm}`) 
    }

    async greyscale(img){
        img = await jimp.read(img);
        img.greyscale();
        return img.getBufferAsync(`image/${this.imgForm}`)
    }

    async brightness(img, val){
        img = await jimp.read(img);
        img.brightness(val);
        return img.getBufferAsync(`image/${this.imgForm}`) 
    }
}