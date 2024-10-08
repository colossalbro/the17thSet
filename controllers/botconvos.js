const {portraitLookup} = require("../utils/downloadUrl.js");
const {tryAgain} = require("../utils/buttons.js");
const queue = require('../tasks.js');


async function getMatricNo(conversation, ctx, next) {
    
    await ctx.reply("Tell me your matriculaion number");
    
    var res = await conversation.waitFor("msg");
    
    var matno = res.message.text.toUpperCase();

    const downloadLinks = portraitLookup(matno, true);

    if (!downloadLinks) {
        await ctx.reply(`No Portrait found for ${matno}. Please Try again.`, tryAgain());
        return;
    }

    await ctx.reply("Checking ⏳");
    await ctx.reply("Hi! So I might take a little longer send your images but I promise, I wouldn't exceed 5 minutes.\
        Bare with me, i'm doing my best 🥺");

    try{
        queue.q.add( () => queue.sendImage(ctx, downloadLinks) );
        return

        // downloadLinks.forEach(async link =>  {
        //     queue.add( () => ctx.replyWithDocument( new InputFile(link) ) );
        // })

    }catch(e) {
        await ctx.reply(`${ctx.chat.first_name}, there seems to be an error downloading your potrait 🥺`);
        throw e;
    }
   
}


module.exports = getMatricNo;