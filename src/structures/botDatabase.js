const mongoose = require("mongoose");
const Guild = require("../schemas/Guild.js");
const User = require("../schemas/User.js");
module.exports = class BotDatabase {
	async loadDB() {
		mongoose.connect(process.env.URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
		mongoose.connection.on("connected", () => {
			console.log("[BOOT] Connected to MongoDB!");
		    });

		mongoose.connection.on("err", (err) => {
			console.log(`[ERROR] Unable to connect to MongoDB. Error:\n${err}\n`);
		});

		mongoose.connection.on("disconnected", () => {
			console.log("[INFO] MongoDB connection has been disconnected");
		});
	}
	/**
     * @param {string} guildId - The guild id being fetched or registered
     */
	async g_fetch(guildId) {
		const guild = await Guild.findOne({ guildId: guildId });
		if(!guild) {
			const newGuild = new Guild({ guildId:guildId });
			const { registeredAt, prefix, blacklist } = newGuild;
			await newGuild.save().catch((error) => console.log("[DB] Guild save error:", error));

			return { registeredAt, prefix, blacklist };
		}
		else {
			const registeredAt = guild.registeredAt;
			const prefix = guild.prefix;
			const blacklist = guild.blacklist;
			return { registeredAt, prefix, blacklist };
		}
	}
	/**
     * @param {string} userId - The users id being fetched or registered
     */
	async u_fetch(userId) {
		const user = User.findOne({ userId:userId });
		if(!user) {
			const newUser = new User({ userId:userId });
			const { wallet, bank, registeredAt, blacklist } = newUser;
			await newUser.save().catch((error) => console.log("[DB] User save error:", error));
		}
		else {
			const wallet = user.wallet;
			const bank = user.bank;
			const registeredAt = user.registeredAt;
			const blacklist = user.blacklist;
			return { wallet, bank, registeredAt, blacklist };
		}
	}

};