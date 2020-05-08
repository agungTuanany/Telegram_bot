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

// Data store
let dataStore = []

// Invoke getData function when script starts
getData ()

bot.command ("fact", (ctx) => {
	ctx.reply ("fact")
})


async function getData () {
	try {
		// Send HTTP request to get information back in json format
		let res = await axios('https://spreadsheets.google.com/feeds/cells/1Kt5OXyeir1oNreua1CUswkM5qL702MpcX8bB4tleWk4/1/public/full?alt=json');
		let data = res.data.feed.entry

		// Ensure empty array
		dataStore = []

		// Process data into dataStore
		data.forEach ( (item) => {
			dataStore.push ({
				row			: item.gs$cell.row,
				col			: item.gs$cell.col,
				val			: item.gs$cell.inputValue
			})
		})
		console.log (dataStore)
	}
	catch (err) {
		console.log (err)
	}
}

// Init bot
bot.launch ()
