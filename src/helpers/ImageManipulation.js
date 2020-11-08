const jimp = require("jimp");
module.exports = class{

    constructor(){

    }

    async sepia(img){
        img = await jimp.read(img);
        img.sepia();
        return img.getBufferAsync("image/png") 
    }

    async circle(img){
        img = await jimp.read(img);
        img.circle();
        return img.getBufferAsync("image/png") 
    }

    async dither565(img){
        img = await jimp.read(img);
        img.dither565();
        return img.getBufferAsync("image/png") 
    }

    async greyscale(img){
        img = await jimp.read(img);
        img.greyscale();
        return img.getBufferAsync("image/png") 
    }

    async brightness(img, val){
        img = await jimp.read(img);
        img.brightness(val);
        return img.getBufferAsync("image/png") 
    }
}