const Discord = require("discord.js");
const got = require("got");

module.exports.execute = async (client, message, args, data) => {
	const embed = new Discord.MessageEmbed();
	got("https://www.reddit.com/r/worldnews/random/.json")
		.then((response) => {
			const [list] = JSON.parse(response.body);
			const [post] = list.data.children;

			const permalink = post.data.permalink;
			const memeUrl = `https://reddit.com${permalink}`;
			const memeImage = post.data.url;
			const memeTitle = post.data.title;
			const memeUpvotes = post.data.ups;
			const memeNumComments = post.data.num_comments;

			embed.setTitle(`${memeTitle}`);
			embed.setURL(`${memeUrl}`);
			embed.setColor("RANDOM");
			embed.setDescription("More info at " + memeImage);

			message.channel.send({ embeds: [embed] });
		})
		.catch(console.error);
};

module.exports.help = {
	name: "news",
	aliases: [],
	usage: "news",
};
