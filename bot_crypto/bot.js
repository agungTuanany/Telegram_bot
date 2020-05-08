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

const apiCrypto = env.CRYPTO_COMPARE_API_BOT

// Instantiate bot
const bot = new Telegraf (env.TELEGRAF_API_CRYPTO_BOT)

bot.command ("start", (ctx) => {
	sendStartMessage (ctx)
})

bot.action ("start", (ctx) => {
	ctx.deleteMessage ()
	ctx.answerCbQuery ("Main Menu")
	sendStartMessage (ctx)

})

bot.action ("price", (ctx) => {
	let priceMessage = "Get Price Information, Select one of the cryptocurrencies below"
	ctx.deleteMessage ()
	ctx.answerCbQuery ("Crypto Prices")

	bot.telegram.sendMessage (ctx.chat.id, priceMessage,
		{
			reply_markup : {
				inline_keyboard: [
					[
						{ text: "Bitcoin", callback_data: "price-BTC" },
						{ text: "Etherum" , callback_data: "price_ETH" }
					],
					[
						{ text: "Bitcoin cash", callback_data: "price-BCH" },
						{ text: "Light cash" , callback_data: "price_LTC" }
					],
					[
						{ text: "Back to Menu" , callback_data: "start" }
					]
				]
			}
		})

})

function sendStartMessage (ctx) {
	let startMessage = "Welcome, this bot gives you cryptocurrency information"

	bot.telegram.sendMessage (ctx.chat.id, startMessage,
		{
			reply_markup: {
				inline_keyboard: [
					[
						{ text: "Crypto Prices", callback_data: "price" }
					],
					[
						{ text: "CoinMarketCup", url : "https://coinmarketcap.com/" }
					]
				]
			}
		})
}

bot.command ("test", (ctx) => {
	testMainMenuMessage (ctx)
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

	testMainMenuMessage (ctx)
})

function testMainMenuMessage (ctx) {
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
}



// Init bot
bot.launch ()

