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

const helpMessage = `
*Get a fun fact from spreadSheet*
/help			- get a help command
/fact			- get a fact from spreadsheet
/update			- updating a spreadsheet
`
bot.command ("help", (ctx) => {
	bot.telegram.sendMessage (ctx.from.id, helpMessage,
		{
			parse_mode		: "markdown"
		}
	)
})

bot.command ("fact", (ctx) => {
	// Get max row number
	let maxRow = dataStore.filter ( (item) => {
		return (item.row === "1" && item.col === "2")
	})[0].val

	// The Math.floor() function returns the largest integer less than or equal to a given number.
	// Generate random number from 1 to max row
	let k = Math.floor (Math.random () * maxRow) + 1

	// Get fact object that matches row with randomly generated number
	let fact = dataStore.filter ( (item) => {
		return (item.row == k && item.col == "5")
	})[0]
	console.log ("=============== maxRow", maxRow)
	console.log ("=============== Fact", fact)

	let message = `
	FACT #${fact.row}
	${fact.val}
	`
	ctx.reply (message)
})

bot.command ("update", async (ctx) => {
	try {
		await getData ()
		ctx.reply ("The sheet updated")
	}
	catch (err) {
		console.log ("Update error", err)
		ctx.reply ("Encountered an error while updating sheet")
	}
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
				row	: item.gs$cell.row,
				col	: item.gs$cell.col,
				val	: item.gs$cell.inputValue
			})
		})
		//console.log ("============= dataStore from getData", dataStore)
	}
	catch (err) {
		console.log (err)
		throw new Error
	}
}

// Init bot
bot.launch ()
