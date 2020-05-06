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


bot.on ("message", (ctx, next) => {
	//	console.log ("ctx.message.photo ====>", ctx.message.photo)
	//	console.log ("ctx.chat.id ====>", ctx.chat.id)
	next ()
})

//bot.command ("test", (ctx) => {
//	 URL
//	 bot.telegram.sendPhoto (ctx.chat.id, "https://cdn.pixabay.com/photo/2014/08/01/15/51/manhattan-407703_1280.jpg")
//
//	 File path
//	 bot.telegram.sendPhoto (ctx.chat.id, {
//		source: __dirname+"/res/dubai.jpg"
//	})
//
//	 File id
//	 bot.telegram.sendPhoto (ctx.chat.id, "AgACAgUAAxkBAAMjXrK165ZFGCPoS-WAwf3d7UrYNFcAAuepMRuL8JBV7KNMLUXo36-P82pqdAADAQADAgADeAADZ7YDAAEZBA" )
//})


bot.command ("newyork", (ctx) => {
	// https://core.telegram.org/bots/api#sendchataction
	bot.telegram.sendChatAction (ctx.chat.id, "upload_photo")
	bot.telegram.sendPhoto (ctx.chat.id,
		{
			source: __dirname+"/res/newyork.jpg"
		},
		{
			reply_to_message_id: ctx.message.message_id
		}
	)
})

bot.command ("dubai", (ctx) => {
	bot.telegram.sendChatAction (ctx.chat.id, "upload_video")
	bot.telegram.sendAnimation (ctx.chat.id,
		"https://media2.giphy.com/media/c0BdI069vyn5K/giphy.gif?cid=790b7611640372d3186cd2314995cb37839375a907f0a08e&rid=giphy.gif"
		,{
			reply_to_message_id: ctx.message.message_id
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
	bot.telegram.sendMediaGroup (ctx.chat.id, cityResult)
})


// Init bot
bot.launch ()
