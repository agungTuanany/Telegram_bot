"use strict"
/*
 * Echo bot
 *
 */

// Dependencies
const Telegraf		= require ("telegraf")

const env			= require ("./../lib/.env")

// Instantiate bot
const bot			= new Telegraf (env.TELEGRAF_API_ECHO_BOT)


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

bot.command ("echo", (ctx) => {
	let input = ctx.message.text
	let inputArray = input.split (" ")
	console.log ("inputArray", inputArray)

	let message = ""
	if (inputArray.length === 1) {
		message ="You said Echo"
	}
	else {
		inputArray.shift ()
		message = inputArray.join (" ")
	}

	ctx.reply (message)
})

// init bot
bot.launch ()
