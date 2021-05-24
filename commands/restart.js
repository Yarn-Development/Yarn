exports.execute = async (client,message,args) => {
  	if (!client.config.admins.includes(message.author.id))return message.reply('this command is owner (Aspekts) only, apologies for any inconvenience.');
  function resetBot(channel) {
    // send channel a message that you're resetting bot [optional]
    channel.send('Restarting...')
    .then(msg => client.destroy())
    .then(() => client.login(client.config.token));
    channel.send('Restart Complete.')
}
resetBot(message.channel);

}
exports.help ={
name:'restart',
aliases:['reset'],
usage:'restart',
category:'Owner'
}