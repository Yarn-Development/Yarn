const Discord = require("discord.js");

(exports.execute = async (client, message, args) => {
  const { guild } = message;

  guild.fetchInvites().then((invites) => {
    const inviteCounter = {
      joe: 0,
      mama: 0,
    };

    invites.forEach((invite) => {
      const { uses, inviter } = invite;
      const { username, discriminator } = inviter;

      const name = `${username}#${discriminator}`;

      inviteCounter[name] = (inviteCounter[name] || 0) + uses;
    });

    let replyText = "Top 10 Inviters:";

    const sortedInvites = Object.keys(inviteCounter).sort(
      (a, b) => inviteCounter[b] - inviteCounter[a]
    );

    console.log(sortedInvites);

    sortedInvites.length = 11;

    for (const invite of sortedInvites) {
      const count = inviteCounter[invite];
      replyText += `\n${invite}, with ${count} invite(s)!`;
    }

    message.channel.send(replyText);
  });
}),
  (exports.help = {
    name: "invites",
    category: "Misc",
    aliases: ["invite"],
    usage: "invites",
  });
