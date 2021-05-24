const Discord = require('discord.js');
const got = require('got');
 const redditFetch = require('reddit-fetch');
 
module.exports.execute = async (client, message, args) => {   
redditFetch({
   subreddit: 'knitting',
    sort: 'hot',
    allowNSFW: false,
    allowModPost: false,
    allowCrossPost: true,
    allowVideo: false
}).then(post => {
   //Make sure to change 'memes' with whatever subreddit you want

   var title = post.title
   var content = post.text
   var postURL = post.permalink
   var postAuthor = post.author
   var upvotes = post.upvotes
   var downvotes = post.downvotes
});
var embed = new Discord.MessageEmbed()
.setTitle(`${title}`)
.setAuthor(`${postAuthor}`)
.setURL(`${postURL}`)
.setDescription(content)
.setFooter(`👍${upvotes} | 👎${downvotes}`)
 message.channel.send(embed)          
}



module.exports.help = {
	name: 'yarn',
  category:'Misc',
	aliases: [],
  usage: "yarn"
};