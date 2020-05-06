"use strict"
/*
 * Simple API bot
 *
 */

// Dependencies
const Telegraf			= require ("telegraf")

const env				= require ("./../lib/.env")

// Instantiate bot
const bot = new Telegraf (env.TELEGRAF_API_SIMPLE_API)

bot.command ("fortune", (ctx) => {

	// Create HTTP request GET to http://yerkee.com/api/fortune

})







// init bot
bot.launch ()
