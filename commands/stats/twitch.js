const TwitchApi = require("node-twitch").default, { MessageEmbed } = require("discord.js")
exports.execute = async(client,message,args) => {
    const twitch = new TwitchApi({
        client_id: process.env.TTVID,
        client_secret: process.env.TTVSECRET
    });
      const loginName = args.join(' ').toLowerCase()
      const users = await twitch.getUsers(loginName);
      const user = users.data[0];
      const userId = user.id;
      const pfp = user.profile_image_url;
      const desc = user.description;
      const views = user.view_count;
        const result = await twitch.getChannelInformation({ broadcaster_id:userId });
      const twitchbed = new MessageEmbed()
      .setTitle(`${result.data[0].broadcaster_name} - Twitch Information`)
      .setURL(`https://twitch.tv/${user.login}`)
      .addField("User Information",
      `User Login - ${result.data[0].broadcaster_name}
       User Display Name - ${user.display_name}
       User ID - ${userId}
       Description - ${desc}
       Total View Count - ${views}
       Broadcaster Language - ${result.data[0].broadcaster_language}`
      )
      .addField("Stream Information",
       `Title - ${result.data[0].title}
       Game - ${result.data[0].game_name}
       Game ID - ${result.data[0].game_id}
       `
      )
      .setColor("#6441A5")
      .setTimestamp()
      .setThumbnail(pfp)
      message.channel.send({embeds:[twitchbed]})
    
      }

exports.help ={
    name:'twitch',
    aliases:[],
    usage:'twitch <streamer>'
}