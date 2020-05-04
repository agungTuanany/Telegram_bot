/*
 * Bot config files
 *
 * Create and export configuration variable
 *
 */

// Dependencies
const env	= require ("./.env")

const environments = {}


// Staging (default) environment
environments.staging = {
	"envName"	  	  	: "staging",
	"telegraph_token"	: "env.TELEGRAF_API"
}
environments.production = {
	"envName"	  	  	: "staging",
	"telegraph_token"	: "env.TELEGRAF_API"
}






// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof (process.env.NODE_ENV) === "string" ? process.env.NODE_ENV.toLowerCase() : ""

// check that the current environments is one of the environment list, if not, default to staging
const environmentToExport = typeof (environments[currentEnvironment]) === "object" ? environments[currentEnvironment] : environments.staging


// Export the module
module.exports = enviroments

