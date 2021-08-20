exports.execute = async(client,message,args) => {
if(!client.config.admins.includes(message.author.id))return;

client.guilds.cache.forEach(guild => {
  var chx = guild.channels.cache.filter(chx => chx.type === "text").find(x => x.position === 0);
  chx.createInvite()
    .then(inv => message.channel.send(`${guild.name} | ${inv.url}`));
    // Outputs the guild name + the invite URL
});

}
exports.help = {
  name:'invs',
  usage:'invs',
  aliases:['inviteguild'],
  category:'Owner'
}