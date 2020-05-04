"user strict"
/*
 * Main bot administrator server
 *
 */


// Dependecise
const Telegraf		= require ("telegraf")

const env	= require ("./lib/.env")

const bot			= new Telegraf (env.TELEGRAF_API)

// Code
bot.start ( (ctx) => {
	ctx.reply ("hi there")
})

bot.help ( (ctx) => {
	ctx.reply ("what can I help you")
})

bot.settings ( (ctx) => {
	ctx.reply ("you have entered settings commands")
})

bot.use ( async (ctx, next) => {
	const start = new Date ()
	await next ()
	const ms = new Date () - start

	// Using This information can make response more dynamic
	console.log ("Response time: %sms", ms)
	console.log ("ctx-from", ctx.from)
	console.log ("ctx-chat", ctx.chat)
	console.log ("ctx-mesagge", ctx.message)
	console.log ("ctx-updateSubTypes", ctx.updateSubTypes)
})

bot.on ("text", (ctx) => {
	ctx.reply (`Hello ${ctx.from.first_name},you have send me a message
	your message is a "${ctx.updateSubTypes[0]} "
	`)
})


// init bot
bot.launch ()
