const queue = require('@esm2cjs/p-queue').default;
const { InputFile } = require('grammy');


const q = new queue({concurrency : 15});


async function sendImage(ctx, FileLocations) {
    let sentPictures = 0;
    const totalPictures = FileLocations.length;
    
    for (const location of FileLocations) {
        sentPictures++;
        
        try {
            await ctx.replyWithDocument(new InputFile(location)); // upload photo

        } catch (e) {
            //try again, maybe upload timed out. This logic is actually bizare :)
            try {

                await ctx.replyWithDocument(new InputFile(location)); // upload each picture

            } catch (e) {
                await ctx.reply(`${ctx.chat.first_name}, there seems to be an error downloading your potrait 🥺`);
            }

            throw e;
        }
        if (sentPictures === totalPictures) {
            await ctx.reply('Done! Happy Convocation 🏃‍♀️');
        } else {
            await ctx.reply('Please hold on while I upload the next portrait...');
        }
    }
}


module.exports = { q , sendImage };