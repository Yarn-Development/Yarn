module.exports = (client, queue, error, args) => {
  switch (error) {
    case 'NotPlaying':
      queue.metadata.send(
          `${client.emotes.error} - There is no music being played on this server!`,
      );
      break;
    case 'NotConnected':
      queue.metadata.send(
          `${client.emotes.error} - You are not connected to any voice channel!`,
      );
      break;
    case 'UnableToJoin':
      queue.metadata.send(
          `${client.emotes.error} - I am  unable to join your voice channel, please check my permissions!`,
      );
      break;
    case 'VideoUnavailable':
      queue.metadata.send(
          `${client.emotes.error} - ${args[0].title} is not available in your country! Skipping...`,
      );
      break;
    case 'MusicStarting':
      queue.metadata.send(`The music is starting... please wait and retry!`);
      break;
    default:
      console.log(error);
      queue.metadata.send(
          `${client.emotes.error} - Something went wrong... Please try again in a few minutes.  If the issue persists, use the ${client.prefix}issue command to contact the Yarn development team about the issue. `,
      );
  }
};
