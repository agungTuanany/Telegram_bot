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
	bot.telegram.sendMessage (ctx.chat.id, "Main Menu",
		{
			reply_markup: {
				inline_keyboard: [
					[
						{ text: "See Fruits List", callback_data: "fruits" }
					],
					[
						{ text: "See Meats List", callback_data: "meats" }
					]
				]
			}
		})
})

bot.action ("fruits", (ctx) => {
	ctx.deleteMessage ()
	ctx.answerCbQuery ("fruits")
	bot.telegram.sendMessage (ctx.chat.id, "List of fruits: \n -Banana\n -Oranges\n -Grapes",
		{
			reply_markup: {
				inline_keyboard: [
					[
						{ text: "Back to menu", callback_data: "menu" }
					],
				]
			}
		})
})

bot.action ("meats", (ctx) => {
	ctx.deleteMessage ()
	ctx.answerCbQuery ("meats")
	bot.telegram.sendMessage (ctx.chat.id, "List of meats: \n -Tenderloin\n -Sirloin\n -Steak",
		{
			reply_markup: {
				inline_keyboard: [
					[
						{ text: "Back to menu", callback_data: "menu" }
					],
				]
			}
		})
})

bot.action ("menu", (ctx) => {
	ctx.deleteMessage ()
	ctx.answerCbQuery ("Main Menu")
	bot.telegram.sendMessage (ctx.chat.id, "Main Menu",
		{
			reply_markup: {
				inline_keyboard: [
					[
						{ text: "See Fruits List", callback_data: "fruits" }
					],
					[
						{ text: "See Meats List", callback_data: "meats" }
					]
				]
			}
		})
})



// Init bot
bot.launch ()

