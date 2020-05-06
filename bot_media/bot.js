"use strict"
/*
 * Media bot
 *
 */


// Dependencies
const Telegraf		= require ("telegraf")

const env			= require ("./../lib/.env")

// Instantiate bot
const bot = new Telegraf (env.TELEGRAF_API_MEDIA_BOT)

/*
 * An example for show images with "URL", "file path", "file id"

		bot.command ("test", (ctx) => {
			URL
			bot.telegram.sendPhoto (ctx.chat.id, "https://cdn.pixabay.com/photo/2014/08/01/15/51/manhattan-407703_1280.jpg")

			File path
			bot.telegram.sendPhoto (ctx.chat.id, {
				source: __dirname+"/res/dubai.jpg"
			})

			File id
			bot.telegram.sendPhoto (ctx.chat.id, "AgACAgUAAxkBAAMjXrK165ZFGCPoS-WAwf3d7UrYNFcAAuepMRuL8JBV7KNMLUXo36-P82pqdAADAQADAgADeAADZ7YDAAEZBA" )
		})
 */


bot.command ( ["start", "help"], (ctx, next) => {
	const message = `
	/dubai			- get image of Dubai
	/newyork		- get image of New York
	/hongkong		- get image of Hongkong
	/singapore		- get image of Singapore
	/cities			- get list of all images
	/citieslist		- get text list of images
	`
	ctx.reply (message)
	next ()
})

bot.on ("message", async (ctx, next) => {
	//	console.log ("ctx.message.photo ====>", ctx.message.photo)
	//	console.log ("ctx.chat.id ====>", ctx.chat.id)
	if (ctx.updateSubTypes [0] === "document") {
		try {
			const link = await bot.telegram.getFileLink (ctx.message.document.file_id)
			ctx.reply (`Your download link ${link}`)
		}
		catch (err) {
			console.log (err)
			ctx.reply (err.description)
		}
	}
	else if (ctx.updateSubTypes [0] === "photo") {
		try {
			const link = await bot.telegram.getFileLink (ctx.message.photo [0].file_id)
			ctx.reply (`Your download link ${link}`)
		}
		catch (err) {
			console.log (err)
			ctx.reply (err.description)
		}
	}
	next ()
})


bot.command ("dubai", (ctx) => {
	bot.telegram.sendChatAction (ctx.chat.id, "upload_video")
	bot.telegram.sendAnimation (ctx.chat.id,
		"https://media2.giphy.com/media/c0BdI069vyn5K/giphy.gif?cid=790b7611640372d3186cd2314995cb37839375a907f0a08e&rid=giphy.gif"
		,{
			reply_to_message_id: ctx.message.message_id
		}
	)
	bot.telegram.sendLocation (ctx.chat.id, 25.0657, 55.17128)
})

bot.command ("hongkong", (ctx) => {
	bot.telegram.sendChatAction (ctx.chat.id, "upload_photo")
	bot.telegram.sendPhoto (ctx.chat.id,
		{
			source					:__dirname+"/res/hongkong.jpg"
		},
		{
			reply_to_message_id		: ctx.message.message_id
		}
	)
})

bot.command ("london", (ctx) => {
	bot.telegram.sendChatAction (ctx.chat.id, "upload_photo_")
	bot.telegram.sendPhoto (ctx.chat.id,
		{
			source					: __dirname+"/res/london.jpg"
		},
		{
			reply_to_message_id		: ctx.message.message_id
		}
	)
})

bot.command ("newyork", (ctx) => {
	// https://core.telegram.org/bots/api#sendchataction
	bot.telegram.sendChatAction (ctx.chat.id, "upload_photo")
	bot.telegram.sendPhoto (ctx.chat.id,
		{
			source					: __dirname+"/res/newyork.jpg"
		},
		{
			reply_to_message_id		: ctx.message.message_id
		}
	)
})

bot.command ("singapore", (ctx) => {
	bot.telegram.sendChatAction (ctx.chat.id, "upload_photo")
	bot.telegram.sendPhoto (ctx.chat.id,
		{
			source					: __dirname+"/res/singapore.jpg"
		},
		{
			reply_to_message_id		: ctx.message.message_id
		}
	)
})


bot.command ("cities", (ctx) => {
	const cities = ["/res/dubai.jpg", "/res/hongkong.jpg", "/res/london.jpg", "/res/newyork.jpg", "/res/singapore.jpg"]

	const cityResult = cities.map (city => {
		return {
			type		: "photo",
			media		: {
				source	: __dirname+city
			}
		}
	})
	bot.telegram.sendChatAction (ctx.chat.id, "upload_photo")
	bot.telegram.sendMediaGroup (ctx.chat.id, cityResult)
})

bot.command ("citieslist", (ctx) => {
	bot.telegram.sendChatAction (ctx.chat.id, "upload_document")
	bot.telegram.sendDocument (ctx.chat.id,
		{
			source		: __dirname+"/res/citieslist.txt"
		}
	)
})

// Init bot
bot.launch ()
