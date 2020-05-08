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
						{ text: "Etherum" , callback_data: "price-ETH" }
					],
					[
						{ text: "Bitcoin cash", callback_data: "price-BCH" },
						{ text: "Lite Coin" , callback_data: "price-LTC" }
					],
					[
						{ text: "Back to Menu" , callback_data: "start" }
					]
				]
			}
		})
})

let priceActionList = ["price-BTC", "price-ETH", "price-BCH", "price-LTC"]

// Callback query handler for "price"
bot.action (priceActionList, async (ctx) => {
	let symbol = ctx.match.split ("-")[1]

	try {
		let res = await axios.get (`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${apiCrypto}`)
		// Store object axios
		let data = res.data.DISPLAY[symbol].USD;
		//console.log (data)

		// Prepare message for user
		let message = `
		Symbol		: ${symbol}
		Price		: ${data.PRICE}
		Open		: ${data.OPENDAY}
		High		: ${data.HIGHDAY}
		Low			: ${data.LOWDAY}
		Supply		: ${data.SUPPLY}
		Market Cap	: ${data.MKTCAP}
		`

		// Delete price Page
		ctx.deleteMessage ()
		// Send new Message containing crypto info with back button
		bot.telegram.sendMessage (ctx.chat.id, message,
			{
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "Back to prices", callback_data: "price" }
						]
					]
				}
			})
	}
	catch (err) {
		console.log ("error", err)
		ctx.reply ("Error encountered")
	}
})

// Callback query handler for "info"
bot.command ("info", (ctx) => {
	// Answer callback query

	// Send message to invoke and open reply keyboard
	bot.telegram.sendMessage (ctx.chat.id, "Bot Info",
		{
			reply_markup: {
				keyboard: [
					[
						{ text: "Credits" },
						{ text: "API" }
					],
					[
						{ text: "Remove Keyboard" }
					]
				],
				resize_keyboard: true,
				one_time_keyboard: true,
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

