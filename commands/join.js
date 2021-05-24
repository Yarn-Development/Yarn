exports.execute = async(client,message,args) => {
  if (message.member.voice.channel) {
		const connection = await message.member.voice.channel.join();
    message.channel.send(`Successfully joined ${message.member.voice.channel.name}!`)
  }
  if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);
  
}
exports.help = {
  name:'join',
  aliases:['summon'],
  category:'Music',
  usage:'join'
}
