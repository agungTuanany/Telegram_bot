"use strict"
/*
 * Start & Help command
 */

// Dependencies
const config = require ("./../../config")

module.exports = (bot) => {
	//handler for /start and /help command
	bot.inlineQuery (['start', 'help'], (ctx) => {
		let message = config.helpMessage

		// Resulty is an array containing 1 inline query resulty article for ctx.answerInlineQuery method
		const result = [
			{
				type			: "article",
				id				: "1",
				title			: "Help Reference",
				input_message_content	: {
					message_text	: message
				},
				description		: "Sends help message on how to use bot",
				reply_markup	: {
					inline_keyboard	: [
						[
							{ text: "Search Pixabay Image", switch_inline_query_current_chat: "pixa" }
						],
						[
							{ text: "Search Wiki", switch_inline_query_current_chat: "wiki" }
						]
					]
				}
			}
		]

		ctx.answerInlineQuery (result)
	})

}


