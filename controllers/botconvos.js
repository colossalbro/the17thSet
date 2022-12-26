const convoPicUrl = require("../utils/downloadUrl.js");
const {tryAgain} = require("../utils/buttons.js");


async function getMatricNo(conversation, ctx, next) {
    
    await ctx.reply("Tell me your matriculaion number/name. If you're going to tell me your name, please make sure its in this format: surname firstname");
    
    var res = await conversation.waitFor("msg");
    
    var matno = res.message.text.toLowerCase()

    const matUrl = convoPicUrl(matno);

    if (!matUrl) {
        await ctx.reply("Im sorry, i can't seem to find your picture. If I still can't find your picture after you try again \
consider messaging @danieljesusegun", tryAgain());
        return;
    }
    
    await ctx.reply("checking ⏳");

    try{
        await ctx.api.sendDocument(ctx.chat.id, matUrl, {
            disable_content_type_detection : true,
            caption : "Here you go! ❤"
        });
        
    }catch(e) {
        await ctx.reply(`${ctx.chat.first_name}, there seems to be an error downloading your potrait 🥺. Please message @danieljesusegun.`);
        throw e;
    }
   
}


module.exports = getMatricNo;