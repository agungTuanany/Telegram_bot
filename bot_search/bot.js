"use strict"
/*
 * Search bot
 *
 */

// Dependencies
const Telegraf		= require ("telegraf")
const axios			= require ("axios")

// Buildin Dependecies
const env			= require ("./../lib/.env")

const bot		= new Telegraf (env.TELEGRAF_API_SEARCH_BOT)
const apikey	= env.PIXABAY_API

bot.command ("test", (ctx) => {
	ctx.reply ("Hello wolrd")
})

bot.on ("inline_query", async (ctx) => {
	const query = ctx.inlineQuery.query

	const res = await axios.get (`https://pixabay.com/api/?key=${apikey}&q=${query}`)
	const data = res.data.hits
	console.log (data)

	let result = data.map ( (item, index) => {
		return {
			type				: 'photo',
			id					: String(index),
			photo_url			: item.webformatURL,
			thumb_url			: item.previewURL,
			photo_width			: 300,
			photo_height		: 200
		}
	})

	ctx.answerInlineQuery (result)
})

// Init bot
bot.launch ()

