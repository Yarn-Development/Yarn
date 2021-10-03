const { Client, Collection } = require("discord.js");
const BotDatabase = require("../structures/botDatabase.js");
const fs = require("fs");
const { Player } = require("discord-player");
const slash = [];
const config = require("../utils/json/bot/config.json");
class YarnClient extends Client {
	constructor(...options) {
		super(...options);
		this.config = config;
		this.filters = this.config.filters;
		this.emotes = this.config.emotes;
		this.interactions = new Collection();
		this.events = new Collection();
		this.commands = new Collection();
		this.aliases = new Collection();
		this.afk = new Collection();
		this.eco = new Collection();
		this.yarnbooth = new Collection();
		this.snipes = new Collection();
		this.db = new BotDatabase(this);
		this.player = new Player(this, {
			enableLive: true,
			leaveOnEnd: true,
			ytdlDownloadOptions: {
				filter: "audioonly",
				requestOptions: {
					headers: {
						cookie: process.env.COOKIE,
					},
				},
			},
		});
	}
	setup(token = process.env.TOKEN) {
		if(!token) throw new Error("No token provided.");
		this.login(token);
		this.loadHandlers();
		this.db.loadDB();
	}

	loadHandlers() {

		fs.readdirSync("./src/commands/").forEach((dir) => {
			const commands = fs.readdirSync(`./src/commands/${dir}/`).filter((file) => file.endsWith(".js"));
			for (const file of commands) {
				const command = require(`../commands/${dir}/${file}`);
				this.commands.set(command.help.name, command);
				command.help.aliases.forEach((alias) => {
					this.aliases.set(alias, command.help.name);
				});
			}
		});
		readdirSync("./src/interactions/").forEach(dir => {
			const interactionfolder = readdirSync(`./src/interactions/${dir}/`)
			for(let folder of interactionfolder) {
				const interactions = readdirSync(`./src/interactions/${dir}/${folder}`)
			for (let file of interactions) {
				let pull = require(`../interactions/${dir}/${folder}/${file}`);
	
				if (pull.name) {
					this.interactions.set(pull.name, pull);
					if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
					/*  Context menus use the message and user type, but dont use a description unlike slash commands, which use the CHAT_INPUT type, and has a description. Be sure to decipher between the two.
						See: https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandType
					*/
					slash.push(pull);
				} 
			  }
			}
		});
		const player = fs.readdirSync("./src/player").filter((file) => file.endsWith(".js"));
		for (const file of player) {
			console.log(`Loading discord-player event ${file}`);
			const event = require(`../player/${file}`);
			this.player.on(file.split(".")[0], event.bind(null, this));
		}
		const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
		for (const file of eventFiles) {
			const event = require(`../events/${file}`);
			const eventName = file.split(".")[0];
			this.on(eventName, event.bind(null, this));
		}
		return this;
	}

}
module.exports = YarnClient;