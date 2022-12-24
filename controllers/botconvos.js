const convoPicUrl = require("../utils/downloadUrl.js");

async function getMatricNo(conversation, ctx) {
    await ctx.reply("Tell me your matriculaion number");
    var res = await conversation.waitFor(":text");
    var matno = res.message.text.toLowerCase()

    const matUrl = convoPicUrl(matno);

    if (!matUrl) {
        ctx.reply("Im sorry, i can't seem to find your picture. If I still can't find your picture after you try again \
consider messaging @danieljesusegun", tryAgain());
        return;
    }
    
    ctx.reply("Checking....");

    await ctx.api.sendDocument(ctx.chat.id, matUrl, {
        disable_content_type_detection : true,
        caption : "👌🏾"
    });
    
    return ctx.reply("Here you go! ❤️");
}

module.exports = getMatricNo;