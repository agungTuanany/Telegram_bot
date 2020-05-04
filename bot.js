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


// init bot
bot.launch ()
