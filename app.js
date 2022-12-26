const { apiThrottler } = require("@grammyjs/transformer-throttler");
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

//when the "Get my picture button" is clicked.
bot.callbackQuery("picture", async (ctx) => await ctx.conversation.enter("getMatricNo"));

//error handler
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof grammy.GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof grammy.HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});


//any other request that can't be handled by previous middleware.
bot.use(controllers.notFound);

//express middleware.
app.use(express.json());


//Exposed route that passes requests from telegram server to bot.
app.get("/the17thset/", (req, res) => res.send("okay"));
//app.post("/the17thset/bottest/", grammy.webhookCallback(bot, "express"));


app.use((req, res)=> res.send("alright"));

app.use((err, req, res, next) => res.send({"Error" : true}));

app.listen(3000, async () => {
    //bot.api.deleteWebhook();
    bot.start()
    //await bot.api.setWebhook("https://lassoloc.co/the17thset/bottest/");
    console.log("running on port 3000");
});