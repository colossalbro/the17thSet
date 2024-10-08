const { isMatno, portraitLookup } = require('./utils/downloadUrl.js');
const { apiThrottler } = require("@grammyjs/transformer-throttler");
const getMatricNo = require("./controllers/botconvos.js");
const controllers = require("./controllers/responses.js"); 
const botConfig = require("./config/botconfig.json");
const convos = require("@grammyjs/conversations");
const express = require("express");
const grammy = require("grammy");
const path = require('path');


//######################
//###  Telegram Bot  ###
//######################
const botkey = botConfig.botApiKey;
const bot = new grammy.Bot(botkey);


//bot middleware
bot.use(grammy.session( {initial: ()=>({}) })); //honestly don't know why, but this is what was in the docs


bot.use(convos.conversations());

//register conversation so other middleware can enter it.
bot.use(convos.createConversation(getMatricNo))

//start command 
bot.command("start", controllers.startResponse);

//only command
bot.command("portraits", async (ctx)=> ctx.conversation.enter("getMatricNo"));

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








//#################
//###  EXPRESS  ###
//#################
const app = express();

const database = require('./database/database.json')    //Load database file.

app.set('view engine', 'ejs');  //So we can use dynamic ejs

app.set('views', './views');  //where ejs looks for html files

app.use('/static', express.static('web/static'));

app.use('/download', express.static('Portraits/', {
  index: false, 
  download: true,
  setHeaders: (res, path) => {
    res.set('Content-Type', 'image/jpg')
    res.set("Content-Disposition", `attachment; filename="${path.split('/').pop()}"`);
  }
}));


app.get('/', (req, res) => res.render('index'));


app.get('/:matno', (req, res, next) => {
  var temp = req.params.matno;

  if (isMatno(temp)) {

    const matno = temp.toUpperCase();
    
    var Portraits = portraitLookup(matno, false)

    res.render('download', { matno, Portraits });

  } else next();

});


app.use((req, res)=> res.redirect('/'));  //redirect to home 

app.use((err, req, res, next) => res.send({"Error" : true}));




// start bot and web server
bot.start();

app.listen(3000, async () => {
    console.log("running on port 3000");
});