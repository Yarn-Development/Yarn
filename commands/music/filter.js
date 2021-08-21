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

  const queue = await client.player.createQueue(message.guild, {
    metadata: message.channel,
  });
  if (!queue) {
    return message.channel.send(
        `${client.emotes.error} - No music currently playing !`,
    );
  }

  if (!args[0]) {
    return queue.metadata.send(
        `${client.emotes.error} - Please specify a valid filter to enable or disable !`,
    );
  }
  const filters = client.config.filters;
  const filter = args[0];

  if (!filters.includes(filter)) {
    return queue.metadata.send(
        `${client.emotes.error} - This filter doesn't exist, try for example (8D, vibrato, pulsator...) !`,
    );
  }

  const filtersUpdated = queue.getFiltersEnabled().includes(filter) ?
    false :
    true;
  try {
    queue.setFilters({
      filter: !queue.getFiltersEnabled().includes(filter),
    });

    if (filtersUpdated) {
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
  name: 'filter',
  aliases: [],
  category: 'Music',
  usage: 'filter [filter name]',
};
