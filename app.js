const convos = require("@grammyjs/conversations");
const grammy = require("grammy");
const myKeys = require("./controllers/mainkeyboard.js");
const convoPicUrl = require("./utils/downloadUrl.js");
const express = require("express");

//import { Bot, webhookCallback, session } from "grammy";
//import {pictureKey, tryAgain} from './controllers/mainkeyboard.js'
//import convoPicUrl from "./utils/downloadUrl.js";
//import express from "express";

const pictureKey = myKeys.pictureKey
const tryAgain = myKeys.tryAgain;

const app = express();

const bot = new grammy.Bot("5877259269:AAH0AyH6N90sy8ZgVlWA8ZMdOyr0wpSFMvc");

bot.use(grammy.session( {initial: ()=>({}) }));

bot.use(convos.conversations());


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
    
    //await ctx.replyWithPhoto(new URL(matUrl));
    
    return ctx.reply("Here you go! ❤️");
}


bot.use(convos.createConversation(getMatricNo))



bot.command("start", (ctx) => {
    ctx.reply(`Hello ${ctx.chat.first_name}, congratulations on your convocation`, pictureKey());
});


bot.command("settings", (ctx) => {
    ctx.reply("I have no settings! My mission is to get you your convocation picture. Nothing else! 🫡", pictureKey())
})


bot.callbackQuery("picture", async (ctx)=> ctx.conversation.enter("getMatricNo"));



bot.use((ctx)=> {
    const greetings = ["hi", "hello", "hey", "yo", "how far", "how fa", "hw fa", "sup"];
    const {message} = ctx
    if ( greetings.includes(message.text.toLowerCase()) ) {
        return ctx.reply(`Hello ${ctx.chat.first_name}, congratulations on your convocation`, pictureKey());
    }
    ctx.reply(`I'm unable to understand what you mean by "${ctx.message.text}". \
I am only able to get you your convocation picture. Lets begin 👇`, pictureKey());
});


app.use(express.json());

app.post("/bottest", grammy.webhookCallback(bot, "express"));


app.listen(3000, async ()=> {
    await bot.api.setWebhook("https://ee4d-105-112-162-113.eu.ngrok.io/bottest");
    console.log("running on port 3000");
});