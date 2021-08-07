exports.execute = async (client,message,args) => {
  	if (!client.config.admins.includes(message.author.id))return message.reply('this command is owner (Aspekts) only, apologies for any inconvenience.');
  function resetBot(channel) {
    // send channel a message that you're resetting bot [optional]
    channel.send('Restarting...')
    .then(msg => client.destroy())
    channel.send('Restart Complete.')
}
resetBot(message.channel);

}
exports.help ={
name:'restart',
aliases:['reset','reboot'],
usage:'restart',
category:'Owner'
}