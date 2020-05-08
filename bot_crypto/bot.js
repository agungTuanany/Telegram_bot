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
	bot.telegram.sendMessage (ctx.chat.id, "Welcome",
		{
			reply_markup: {
				inline_keyboard: [
					[
						{ text: "one", callback_data: "one" },
						{ text: "one", callback_data: "one" }
					],
					[
						{ text: "one", callback_data: "one" },
						{ text: "one", callback_data: "one" },
						{ text: "one", callback_data: "one" }
					],
					[
						{ text: "one", callback_data: "one" },
						{ text: "one", callback_data: "one" },
						{ text: "one", callback_data: "one" },
						{ text: "one", callback_data: "one" }
					],
					[
						{ text: "one", callback_data: "one" }
					]
				]
			}
		})
})





// Init bot
bot.launch ()

