"use strict"

/*
 * Bot command start
 *
 */

const config = require ("../../config")

module.exports = (bot) => {
	bot.command(['start', 'help'], (ctx) => {
		// Set welcome message
		const message = config.helpMessage

		//ctx.reply(text, [extra params])
		ctx.reply(message, {
			reply_markup: {
				inline_keyboard: [
					[
						// Use switch inline query current chat to pre-type "@s300bot p "
						{ text: 'Search Pixabay Image', switch_inline_query_current_chat: 'pixa ' }
					],
					[
						// Use switch inline query current chat to pre-type "@s300bot w "
						{ text: 'Search Wiki', switch_inline_query_current_chat: 'wiki ' }
					]
				]
			}
		})
	})

}





