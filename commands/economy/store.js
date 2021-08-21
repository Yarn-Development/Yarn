const Discord = require('discord.js');

exports.execute = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
      .setDescription(
          '**VIP Ranks**\n\n\
		Bronze: 3500 Coins [y!buy bronze]\n\n\
		**Lifestyle Items**\n\n\
		Fresh Nikes: 600 [y!buy nikes]\n\
		Car: 800 [y!buy car]\n\
		Mansion: 1200 [y!buy mansion]\n\n\
		**Useful items**\n\
		Fishing Rod: 50 [y!buy fishing]',
      )
      .setColor('#FFFFFF');
  message.channel.send({embeds: [embed]});
};
module.exports.help = {
  name: 'store',
  description: 'Check the store!',
  category: 'Economy',
  aliases: ['shop'],
  usage: 'store',
};
