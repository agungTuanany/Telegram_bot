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

// Create new command
bot.command (["test", "Test", "test1"], (ctx) => {
	ctx.reply (` Hello from new Command
	`)
})

bot.hears ("json", (ctx) => {
	ctx.reply ("is a object notation in Java Script")
})

// handler username eg. @botfather
bot.mention ("botFather", (ctx) => {
	ctx.reply ("You using mention method")
})


// Handler phone numbers eg. (+62) 0813-154-154-154
bot.phone ("+61813-154-154-154", (ctx) => {
	ctx.reply ("You using Phone method")
})


// Handler hashtags eg. #hash
bot.hashtag ("hash", (ctx) => {
	ctx.reply ("you using hashtag method")
})

// on method
// the "text" is an updatesTypes see on https://telegraf.js.org/#/?id=update-types
//bot.on ("text", (ctx) => {
//	ctx.reply ("You send me a text types")
//})

// on method "sicker" updatesTypes
bot.on ("sticker", (ctx) => {
	ctx.reply ("You send me a sticker types")
})

// use method
bot.use ( (ctx) => {
	ctx.reply (`hi "${ctx.from.first_name}",
	you say what?`)
	console.log (ctx.from.first_name)
})

// init bot
bot.launch ()
