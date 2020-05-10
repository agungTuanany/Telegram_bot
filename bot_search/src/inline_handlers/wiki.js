"use strict"

/*
 * Wiki bot command
 *
 */

// Dependencies
const axios = require ("axios")

module.exports = (bot) => {
	bot.inlineQuery (/wiki\s.+/, async (ctx) => {
		let input = ctx.inlineQuery.query.split (" ")
		input.shift ()
		const query = input.join (" ")
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
							{ text: `Share ${item}`, switch_inline_query: `wiki ${item}` }
						]
					]
				}
			}
		})

		ctx.answerInlineQuery (result)
	})

}
