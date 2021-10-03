const { Schema, model } = require("mongoose");
const config = require("../utils/json/bot/config.json");
module.exports = model("Guild", new Schema({
	guildId:{
		type:String,
		unique:true,
	},
	registeredAt:{
		type:Number,
		default:Date.now(),
	},
	prefix: {
		type:String,
		default:config.prefix,
	},
	blacklist:{
		state:{
			type:Boolean,
			default:false,
		},
		reason:{
			type:String,
			default:"No reason provided.",
		},
		time:{
			type:Number,
			default:0,
		},
	},
}));
