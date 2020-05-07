"use strict"
/*
 * Simple API bot
 *
 */

// Dependencies
const Telegraf			= require ("telegraf")
const http				= require ("http")
const axios				= require ("axios")

const env				= require ("./../lib/.env")

// Instantiate bot
const bot = new Telegraf (env.TELEGRAF_API_SIMPLE_API)

bot.command ("fortune", (ctx) => {

	// Create HTTP request GET to http://yerkee.com/api/fortune
	// XXX TODO: JSON stringify not parsed correctly
	http.get ("http://yerkee.com/api/fortune/wisdom", (res) => {
		let buffer = ""

		// Called when a data chunk is recieved
		res.on ("data", (chunk) => {
			buffer += chunk
		})

		res.on ("end", () => {
			const obj = JSON.parse (buffer)
			console.log ("=======================>", obj)
			ctx.reply (obj)
		})
	})

})

bot.command ("wish", (ctx) => {
	axios.get ("http://yerkee.com/api/fortune/wisdom")
		.then (res => {
			ctx.reply (res.data.fortune)
		})
		.catch ( (err) => {
			console.log (err)
		})
})

bot.command ("cat", async (ctx) => {
	let input			= ctx.message.text
	let inputArray	= input.split (" ")

	// XXX FIXME: GET method to https://aws.random.cat/meow take more than 10 seconds it's not worth to await?
	// "/cat"
	if (inputArray.length === 1) {
		try {
			let res = await axios.get ("https://aws.random.cat/meow")
			console.log ("======================== without argument start")
			console.log (res.data.file)
			console.log ("======================== without argument end")
			ctx.replyWithPhoto (res.data.file)
		}
		catch (err) {
			console.log (err)
		}
	}
	else {
		try {
			console.log ("before=================>", inputArray)
			console.log ("before=================>", inputArray.length)
			inputArray.shift ()
			console.log ("after=================>", inputArray)
			console.log ("after=================>", inputArray.length )
			input = inputArray.join (" ")
			ctx.replyWithPhoto (`https://cataas.com/cat/says/${input}`)
		}
		catch (err) {
			console.log (err)
		}
	}
})

// init bot
bot.launch ()
