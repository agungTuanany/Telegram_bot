"use strict"
/*
 * Simple API bot
 *
 */

// Dependencies
const Telegraf			= require ("telegraf")
const http				= require ("http")
const axios				= require ("axios")
const fs				= require ("fs")

const env				= require ("./../lib/.env")

// Instantiate bot
const bot = new Telegraf (env.TELEGRAF_API_SIMPLE_API)

const helpMessage = `
*Simple API BOT*
/fortune			- get a fortune words
/cat				- get a random cat pic
/cat \`<text>\`		- get cat image with text
/dogbreeds			- get list of dog breeds
/dog \`<breed>\`		- get image of dog breed
`

bot.help ( (ctx) => {
	bot.telegram.sendMessage (ctx.from.id, helpMessage,
		{
			parse_mode		: "markdown"
		}
	)
})


bot.command ("fortune", (ctx) => {

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
			console.log ("=================> before", inputArray)
			console.log ("=================> before", inputArray.length)
			inputArray.shift ()
			console.log ("=================> after", inputArray)
			console.log ("=================> after", inputArray.length )
			input = inputArray.join (" ")
			ctx.replyWithPhoto (`https://cataas.com/cat/says/${input}`)
		}
		catch (err) {
			console.log (err)
		}
	}
})

bot.command ("dogbreeds", (ctx) => {
	let rawdata = fs.readFileSync (__dirname+"/dogbreeds.json", "utf8");
	let data = JSON.parse (rawdata)
	console.log (data)

	let message = "Dog breeds: \n"
	data.forEach ( (item) => {
		message += `${item}\n`
	})

	ctx.reply (message)
})

bot.command ("dog", (ctx) => {
	let input = ctx.message.text.split (" ")
	if (input.length != 2) {
		ctx.reply ("You must give a 'dog' breed as the second argument")
		return		// return keyword for stopping the code in continuing or executing
	}
	let breedInput = input [1]

	let rawdata = fs.readFileSync (__dirname+"/dogbreeds.json", "utf8");
	let data = JSON.parse (rawdata)

	if (data.includes (breedInput)) {
		axios.get (`https://dog.ceo/api/breed/${breedInput}/images/random`)
			.then ( (res)  => {
				console.log (res.data.message)
				ctx.replyWithPhoto (res.data.message)
			})
			.catch ( (err) => console.log (err))
	}
	else {
		let suggestions = data.filter ( (item) => {
			return item.startsWith (breedInput)
		})

		let message = `Did you mean:\n`

		suggestions.forEach ( (item) => {
			message += `${item}\n`
		})

		if (suggestions.length === 0) {
			ctx.reply ("Cannot find breed")
		}
		else {
			ctx.reply (message)
		}
	}

})

// init bot
bot.launch ()
