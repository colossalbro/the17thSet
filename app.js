const getMatricNo = require("./controllers/botconvos.js");
const controllers = require("./controllers/responses.js");
const botConfig = require("./config/botconfig.json");
const convos = require("@grammyjs/conversations");
const express = require("express");
const grammy = require("grammy");

//start express
const app = express();

//start bot
const botkey = botConfig.botApiKey;
const bot = new grammy.Bot(botkey);

//bot middleware (similar to express)
bot.use(grammy.session( {initial: ()=>({}) })); //honestly don't know why, but this is what was in the docs


bot.use(convos.conversations());


//register conversation so other middleware can enter it.
bot.use(convos.createConversation(getMatricNo))


//start command 
bot.command("start", controllers.startResponse);

//settings command
bot.command("settings", controllers.settingsResponse);

//only command
bot.command("mypicture", async (ctx)=> ctx.conversation.enter("getMatricNo"));

bot.callbackQuery("picture", async (ctx)=> ctx.conversation.enter("getMatricNo"));


//any other request that can't be handled by previous middleware.
bot.use(controllers.notFound);


//express middleware.
app.use(express.json());


//Exposed route that passes requests from telegram server to bot.
app.post("/bottest", grammy.webhookCallback(bot, "express"));


app.listen(3000, async ()=> {
    //self explanatory.
    await bot.api.setWebhook("https://0a53-105-112-162-113.eu.ngrok.io/bottest");
    console.log("running on port 3000");
});