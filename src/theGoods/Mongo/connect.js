const mongo = require("mongoose"); // database

require("dotenv").config();// .env vars

module.exports.connect = async () => {
    let urlConnect = process.env.MongoConnect;
    mongo.connect(urlConnect, {useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true});

    mongo.connection.on("connected", () => {
        console.log(`MongoDB is connected`)
    })

    mongo.connection.on("disconnected", () => {
        console.log(`MongoDb disconnected`)
    })

}