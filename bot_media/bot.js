"use strict"
/*
 * Media bot
 *
 */


// Dependencies
const Telegraf		= require ("telegraf")

const env			= require ("./../lib/.env")

// Instantiate bot
const bot = new Telegraf (env.TELEGRAF_API_MEDIA_BOT)


bot.on ("message", (ctx, next) => {
	//	console.log ("ctx.message.photo ====>", ctx.message.photo)
	//	console.log ("ctx.chat.id ====>", ctx.chat.id)
	next ()
})

bot.command ("test", (ctx) => {
	// URL
	// bot.telegram.sendPhoto (ctx.chat.id, "https://cdn.pixabay.com/photo/2014/08/01/15/51/manhattan-407703_1280.jpg")

	// File path
	// bot.telegram.sendPhoto (ctx.chat.id, {
	//	source: __dirname+"/res/dubai.jpg"
	//})

	// File id
	// bot.telegram.sendPhoto (ctx.chat.id, "AgACAgUAAxkBAAMjXrK165ZFGCPoS-WAwf3d7UrYNFcAAuepMRuL8JBV7KNMLUXo36-P82pqdAADAQADAgADeAADZ7YDAAEZBA" )
})



// Init bot
bot.launch ()
