"use strict"
/*
 * Search bot
 *
 */

// Dependencies
const Telegraf		= require ("telegraf")
const axios			= require ("axios")

// Buildin Dependecies
const env			= require ("./../lib/.env")

const bot		= new Telegraf (env.TELEGRAF_API_SEARCH_BOT)

const.command ("test", (ctx) => {
	ctx.reply ("Hello wolrd")
})

// Init bot
bot.launch ()

