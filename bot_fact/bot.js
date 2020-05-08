"use strict"
/*
 * Fact Bot
 *
 */

// Dependencies
const Telegraf		= require ("telegraf")
const axios			= require ("axios")

// Buildin dependencies
const env			= require ("./../lib/.env")

// Instantiate bot
const bot = new Telegraf (env.TELEGRAF_API_FACTS_BOT)

bot.command ("fact", (ctx) => {
	ctx.reply ("fact")
})

// Init bot
bot.launch ()
