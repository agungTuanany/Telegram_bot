"use strict"
/*
 * Channel bot
 *
 */

// Dependencies
const Telegraf	= require ("telegraf")

const env		= require ("./../lib/.env")

const bot = new Telegraf (env.TELEGRAF_API_CHANNEL_BOT)

bot.command ("start", (ctx) => {
	bot.telegram.sendMessage (ctx.chat.id, "Wellcome")
	//ctx.reply ("wellcome")

})


// Init  bot
bot.launch ()
