exports.execute = async (client, message, args) => {
  if (!message.member.voice.channel) {
    return message.channel.send(
        `${client.emotes.error} - You're not in a voice channel !`,
    );
  }

  if (
    message.guild.me.voice.channel &&
    message.member.voice.channel.id !== message.guild.me.voice.channel.id
  ) {
    return message.channel.send(
        `${client.emotes.error} - You are not in the same voice channel !`,
    );
  }

  if (!args[0]) {
    return message.channel.send(
        `${client.emotes.error} - Please indicate the title of a song !`,
    );
  }
  const query = args[0];
  const searchResult = await client.player.search(query, {
    requestedBy: message.author,
  });
  if (!searchResult || !searchResult.tracks.length) {
    return message.reply('No results were found!');
  }
  const queue = await client.player.createQueue(message.guild, {
    metadata: message.channel,
  });
};
module.exports.help = {
  name: 'search',
  aliases: ['sr'],
  category: 'Music',
  usage: 'search [name/URL]',
};
