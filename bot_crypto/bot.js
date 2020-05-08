"use strict"

/*
 * Bot Crypto
 *
 */

// Dependencies
const Telegraf		= require ("telegraf")
const axios			= require ("axios")

// Buildin dependencies
const env			= require ("./../lib/.env")

// Instantiate bot
const bot = new Telegraf (env.TELEGRAF_API_CRYPTO_BOT)

bot.command ("test", (ctx) => {
	ctx.reply ("run test success")
})





// Init bot
bot.launch ()

