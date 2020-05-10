"use strict"
/*
 * Images bot command to pixabay
 *
 */

// Dependencies
const axios = require ("axios")

// Buildin dependencies
const env = require ("./../../../lib/.env.json")
const apikey = env.PIXABAY_API

		console.log ("apikey",  apikey)
module.exports = (bot) => {
	bot.inlineQuery (/pixa\s.+/, async (ctx) => {
		// Split string by spaces into an array
		let input = ctx.inlineQuery.query.split (" ")
		// Remove first element in an array
		input.shift ()
		const query = input.join (" ")

		const res = await axios.get (`https://pixabay.com/api/?key=${apikey}&q=${query}`)
		const data = res.data.hits

		let result = data.map ( (item, index) => {
			return {
				type				: 'photo',
				id					: String(index),
				photo_url			: item.webformatURL,
				thumb_url			: item.previewURL,
				photo_width			: 300,
				photo_height		: 200,
				caption				: `[Source](${item.webformatURL})\n[Large Image](${item.largeImageURL})`,
				parse_mode			: 'Markdown'
			}
		})

		ctx.answerInlineQuery (result)
	})
}
