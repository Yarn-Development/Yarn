exports.execute = async (client, message) => {
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

  const queue = await client.player.getQueue(message.guild, {
    metadata: message.channel,
  });
  if (!queue) {
    return message.channel.send(
        `${client.emotes.error} - No music currently playing !`,
    );
  }

  try {
    queue.setFilters({
      nightcore: !queue.getFiltersEnabled().includes('nightcore'),
    });

    if (queue.getFiltersEnabled().includes('nightcore')) {
      queue.metadata.send(
          `${client.emotes.music} - I'm **adding** the filter to the music, please wait... Note : the longer the music is, the longer this will take.`,
      );
    } else {
      queue.metadata.send(
          `${client.emotes.music} - I'm **disabling** the filter on the music, please wait... Note : the longer the music is playing, the longer this will take.`,
      );
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports.help = {
  name: 'nightcore',
  aliases: [],
  category: 'Music',
  usage: 'nightcore',
};
