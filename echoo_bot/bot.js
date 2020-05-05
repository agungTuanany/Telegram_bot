"use strict"
/*
 * Echo bot
 *
 */

// Dependencies
const Telegraf		= require ("telegraf")

const env			= ("./../lib/.env")

// Instantiate bot
const bot			= new Telegraf (env.TELEGRAF_API)

const helpMessage = `
Say something ..
/start	- start the bot
/help	- command reference
`

bot.start ( (ctx) => {
	ctx.reply ("Hi I am echo Bot")
	ctx.reply (helpMessage)
})

bot.help ( (ctx) => {
	ctx.reply (helpMessage)

})

// init bot
bot.launch ()
