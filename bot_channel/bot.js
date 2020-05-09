"use strict"
/*
 * Channel bot
 *
 */

// Dependencies
const Telegraf	= require ("telegraf")
const fetch		= require ("node-fetch")

const env		= require ("./../lib/.env")

const bot		= new Telegraf (env.TELEGRAF_API_CHANNEL_BOT)
const token		= env.TELEGRAF_API_CHANNEL_BOT

//bot.use ( (ctx) => {
//	ctx.reply ("-1001270165848")
//	ctx.reply ("chat id is", ctx.chat.id)
//})
//bot.command ("start", (ctx) => {
//	bot.telegram.sendMessage (ctx.chat.id, "Wellcome")
//	//ctx.reply ("wellcome")
//})

let data = {
	chat_id		: "-1001270165848",
};

( async () => {
	await fetch (`https://api.telegram.org/bot${token}/sendMessage`,
		{
			method      : "POST",
			body        : JSON.stringify (data),
			headers     : {
				"Content-Type": "application/json"

			}

		}
	)

}) ()



// Init  bot
bot.launch ()



