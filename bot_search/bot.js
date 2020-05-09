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

//bot.on ("inline_query", async (ctx) => {
//	const query = ctx.inlineQuery.query
//
//	const res = await axios.get (`https://pixabay.com/api/?key=${apikey}&q=${query}`)
//	const data = res.data.hits
//	console.log (data)
//
//	let result = data.map ( (item, index) => {
//		return {
//			type				: 'photo',
//			id					: String(index),
//			photo_url			: item.webformatURL,
//			thumb_url			: item.previewURL,
//			photo_width			: 300,
//			photo_height		: 200,
//			caption				: `[Source](${item.webformatURL})\n[Large Image](${item.largeImageURL})`,
//			parse_mode			: 'Markdown'
//		}
//	})
//
//	ctx.answerInlineQuery (result)
//})

bot.on ("inline_query", async (ctx) => {
	const query = ctx.inlineQuery.query
	const res = await axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}&limit=50`);

	const data = res.data
	const allTitles = data [1]
	const allLinks = data [3]

	// If user types inline query slowly, search query may empty,
	if (allTitles === undefined) {
		return
	}

	//process the data using javascript's array map method to loop each element in array and return something as an element in the results array
	const result = allTitles.map ( (item, index) => {
		return {
			type				: "article",
			id					: String (index),
			title				: item,
			input_message_content	: {
				message_text	: `#{item\n${allLinks [index]}}`
			},
			description			: allLinks [index],
			reply_markup		: {
				inline_keyboard	: [
					[
						{ text: `Share ${item}`, switch_inline_query: `${item}` }
					]
				]
			}
		}

	})

	ctx.answerInlineQuery (result)
})

// Init bot
bot.launch ()

