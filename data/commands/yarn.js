const Discord = require('discord.js');
const got = require('got');

module.exports.execute = async (client, message, args) => {
	const embed = new Discord.MessageEmbed();
	
got('https://www.reddit.com/r/YarnAddicts/random/.json')
		.then(response => {
			const [list] = JSON.parse(response.body);
			const [post] = list.data.children;

			const permalink = post.data.permalink;
			const memeUrl = `https://reddit.com${permalink}`;
			const memeImage = post.data.url;
      if(!memeImage) return message.reply("No image from api request, please rerun the command.")
      else {
			const memeTitle = post.data.title;
			const memeUpvotes = post.data.ups;
      const memeAuthor = post.data.author;
			const memeNumComments = post.data.num_comments;
      embed.setAuthor(`Author: u/${memeAuthor}`);
			embed.setTitle(`${memeTitle}`);
			embed.setURL(`${memeUrl}`);
			embed.setColor('RANDOM');
			embed.setImage(memeImage);
			embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);

			message.channel.send(embed);
      }
		})
		.catch(console.error);
};



exports.help = {
	name: 'yarn',
  category:'Misc',
	aliases: [],
  usage: "yarn"
};