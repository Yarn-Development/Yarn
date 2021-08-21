module.exports = (queue, query, tracks) => {
  queue.metadata.send({
    embeds: [
      {
        embed: {
          color: 'BLUE',
          author: {name: `Here are your search results for ${query}`},
          timestamp: new Date(),
          description: `${tracks
              .map((t, i) => `**${i + 1}** - ${t.title}`)
              .join('\n')}`,
        },
      },
    ],
  });
};
