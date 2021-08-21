const Canvas = require('canvas');
const Discord = require('discord.js');

module.exports.execute = async (client, message) => {
  // fires every time when someone joins the server
  // If not in a guild return
  if (!message.member.guild) return;
  // create a new Canvas
  const canvas = Canvas.createCanvas(1772, 633);
  // make it "2D"
  const ctx = canvas.getContext('2d');
  // set the Background to the welcome.png
  const background = await Canvas.loadImage(`./welcome.png`);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#f2f2f2';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  // set the first text string
  const textString3 = `${message.member.user.username}`;
  // if the text is too big then smaller the text
  if (textString3.length >= 14) {
    ctx.font = 'bold 100px Genta';
    ctx.fillStyle = '#f2f2f2';
    ctx.fillText(textString3, 720, canvas.height / 2 + 20);
  }
  // else dont do it
  else {
    ctx.font = 'bold 150px Genta';
    ctx.fillStyle = '#f2f2f2';
    ctx.fillText(textString3, 720, canvas.height / 2 + 20);
  }
  // define the Discriminator Tag
  const textString2 = `#${message.member.user.discriminator}`;
  ctx.font = 'bold 40px Genta';
  ctx.fillStyle = '#f2f2f2';
  ctx.fillText(textString2, 730, canvas.height / 2 + 58);
  // define the message.member count
  const textString4 = `message.member #${message.member.guild.message.memberCount}`;
  ctx.font = 'bold 60px Genta';
  ctx.fillStyle = '#f2f2f2';
  ctx.fillText(textString4, 750, canvas.height / 2 + 125);
  // get the Guild Name
  const textString5 = `${message.member.guild.name}`;
  ctx.font = 'bold 60px Genta';
  ctx.fillStyle = '#f2f2f2';
  ctx.fillText(textString5, 700, canvas.height / 2 - 150);
  // create a circular "mask"
  ctx.beginPath();
  ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true); // position of img
  ctx.closePath();
  ctx.clip();
  // define the user avatar
  const avatar = await Canvas.loadImage(
      message.member.user.displayAvatarURL({format: 'jpg'}),
  );
    // draw the avatar
  ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
  // get it as a discord attachment
  const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      'welcome-image.png',
  );
    // define the welcome embed
  const welcomeembed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTimestamp()
      .setFooter('Welcome', message.member.guild.iconURL({dynamic: true}))
      .setDescription(
          `**Welcome to ${message.member.guild.name}!**
      Hi <@${message.member.id}>!, read and accept the rules!`,
      )
      .setImage('attachment://welcome-image.png')
      .attachFiles(attachment);
    // define the welcome channel

  // send the welcome embed to there
  message.member.send(welcomeembed);
};
