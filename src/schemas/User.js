const { Schema, model } = require("mongoose");
module.exports = model("User", new Schema({
	userId:{
		type:String,
		unique:true,
	},
	wallet:{
		type:Number,
		default:0,
	},
	bank: {
		type:Number,
		default:0,
	},
	registeredAt:{
		type:Number,
		default:Date.now(),
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