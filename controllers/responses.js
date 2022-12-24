const buttons = require("../utils/buttons.js")

const notFound = (ctx) => {
    const greetings = ["hi", "hello", "hey", "yo", "how far", "how fa", "hw fa", "sup"];
    const {message} = ctx
    if ( greetings.includes(message.text.toLowerCase()) ) {
        return ctx.reply(`Hello ${ctx.chat.first_name}, congratulations on your convocation`, buttons.pictureKey());
    }
    ctx.reply(`I'm unable to understand what you mean by "${ctx.message.text}". \
I am only able to get you your convocation picture. Lets begin 👇`, buttons.pictureKey());
}


const settingsResponse = (ctx) => {
    ctx.reply("I have no settings! My mission is to get you your convocation picture. Nothing else! 🫡", buttons.pictureKey())
}


const startResponse = (ctx) => {
    ctx.reply(`Hello ${ctx.chat.first_name}, congratulations on your convocation`, pictureKey());
}

exports.notFound = notFound;
exports.settingsResponse =  settingsResponse
exports.startResponse = startResponse;