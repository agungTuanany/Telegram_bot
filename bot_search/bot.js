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


//handler for /start and /help command
bot.command(['start', 'help'], (ctx) => {
	//set welcome message
	const message = `
Welcome to Search Bot!
Use the inline mode below
@s300bot pixa <search image>
@s300bot wiki <search wiki>
`;

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

bot.inlineQuery (['start', 'help'], (ctx) => {
	let message = `
Welcome to Search Bot!
Use the inline mode below
@s300bot pixa <search image>
@s300bot wiki <search wiki>
`;

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

// Init bot
bot.launch ()

