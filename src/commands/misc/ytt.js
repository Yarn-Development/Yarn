const Discord = require("discord.js");

exports.execute = async (client, message, args, data) => {
	if (!message.member.voice.channel) {
		return message.reply("Please join a voice channel!");
	}
	if (message.member.voice.channel) {
		client.discordTogether
			.createTogetherCode(message.member.voice.channelID, "youtube")
			.then(async (invite) => {
				return message.channel.send(
					`Your youtube together code is ${invite.code} ! **Click on the link** to get started!`,
				);
			});
	}
};
exports.help = {
	name: "ytt",
	aliases: ["youtube-together"],
	usage: "ytt",
	category: "Fun",
};
/* const defaultApplications = {
  youtube: '880218394199220334', // Note : First package to include the new YouTube Together version, any other package offering it will be clearly inspired by it
  youtubedev: '880218832743055411', // Note : First package to include the new YouTube Together development version, any other package offering it will be clearly inspired by it
  poker: '755827207812677713',
  betrayal: '773336526917861400',
  fishing: '814288819477020702',
  chess: '832012774040141894', // Note : First package to offer chess, any other package offering it will be clearly inspired by it
  chessdev: '832012586023256104', // Note : First package to offer chessDev, any other package offering it will be clearly inspired by it
};
*/