"use strict"
/*
 * Search bot
 *
 */

// Dependencies
const Telegraf		= require ("telegraf")

// Buildin Dependecies
const env			= require ("./../lib/.env")

// Instantiate new bot
const bot		= new Telegraf (env.TELEGRAF_API_SEARCH_BOT)

// Instantiate all Command
const startCommand	= require ("./src/commands/start")
startCommand (bot)

const startHandler	= require ("./src/inline_handlers/start")
startHandler (bot)

const imageHandler	= require ("./src/inline_handlers/image")
imageHandler (bot)

const wikiHandler	= require ("./src/inline_handlers/wiki")
wikiHandler (bot)

// Init bot
bot.launch ()
