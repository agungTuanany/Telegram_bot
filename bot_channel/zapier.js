"use strict"
/*
 * Use this Code on https://zapier.com/app/editor/-----/nodes/-----/fields
 * this is wrapped in an `async` function
 * you can use await throughout the function
 *
 */



let newDescription = inputData.description.replace ("(Feed generated with FetchRSS )", "")
let message = `
  <a href="${inputData.link}">Source</a>

  Description:
  ${newDescription}
`;

// this is wrapped in an `async` function
// you can use await throughout the function

const token = "number:alphabet" // Change this token with your telegram_bot

let data = {
	chat_id        : "-1001270165848",				// Change this into your own Channel
	text           : message,
	parse_mode     : "HTML",
	reply_markup   : {
		inline_keyboard: [
			[
				{ text: "Go to Post", url: inputData.link}
			]
		]
	}
};

await fetch (`https://api.telegram.org/bot${token}/sendMessage`,
	{
		method      : "POST",
		body        : JSON.stringify (data),
		headers     : {
			"Content-Type": "application/json"
		}
	}
);
output = [{id: 123, hello: "world"}];
