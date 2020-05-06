"use strict"
/*
 * Media bot
 *
 */


// Dependencies
const telegraf		= require ("telegraf")

const env			= require ("./../lib/.env")

// Instantiate bot
const bot = new Telegraf (env.TELEGRAF_API_MEDIA_BOT)


// Init bot
bot.launch ()
