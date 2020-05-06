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

// Using bot middleware
bot.use ( (ctx, next) => {
	if (ctx.updateSubTypes [0] === "text") {
		//console.log (`${ctx.from.username} said: ${ctx.message.text}`)
		// message on group
		bot.telegram.sendMessage (-450493027, `${ctx.from.username} said : ${ctx.message.text}`)
	}
	else {
		//console.log (`${ctx.from.username} sent a ${ctx.updateSubTypes [0] }`)
		// message on group
		bot.telegram.sendMessage (-450493027, `${ctx.from.username} sent a ${ctx.updateSubTypes [0]}`)
	}
	next ()
})


const helpMessage = `
Say something ..
/start			- start the bot
/help			- command reference
/echo			- say "You said echo"
/echo <msg>		- echo a message
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
