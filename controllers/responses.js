const buttons = require("../utils/buttons.js")

const notFound = (ctx) => {
    const greetings = ["hi", "hello", "hey", "yo", "how far", "how fa", "hw fa", "sup"];
    const thanks = ["thanks", "Thanks", "thank you", "Thank you!", "thanks so much"];
    const {message} = ctx
    if ( greetings.includes(message.text.toLowerCase()) ) {
        return ctx.reply(`Hello ${ctx.chat.first_name}. Little shege here and there on Hebron grounds, but you made it! You're an eagle 😉`, buttons.pictureKey());
    }

    if (thanks.includes(message.text.toLowerCase())) {
        return ctx.reply('❤️');
    }

    return ctx.reply(`I do not understand what you mean by "${ctx.message.text}". \
I do understand convocation portraits 👇`, buttons.pictureKey());
}

const startResponse = (ctx) => {
    return ctx.reply(`Hello ${ctx.chat.first_name}. Little shege here and there on Hebron grounds, but you made it! You're an eagle 😉`, buttons.pictureKey());
}

exports.notFound = notFound;
exports.startResponse = startResponse;