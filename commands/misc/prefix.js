const { Permissions } = require("discord.js");
exports.execute = async (client, message, args) => {
  if (!message.member.permissions.has(Permissions.FLAGS.MANGE_MESSAGES)) {
    message.reply(
      "You do not have permissions to change the prefix. Please contact a moderator or developer to do so."
    );
  }
  if (args.join("") === client.config.prefix || !args[0]) {
    client.db.delete(`prefix_${message.guild.id}`);
    client.db.set(`prefix_${message.guild.id}`, "y!");
    await message.channel.send(`Prefix reset to \`y!\``);
  } else {
    client.db.set(`prefix_${message.guild.id}`, args.join(" "));
    await message.channel.send(
      `Updated bot prefix. The new prefix is now \`${args[0]}\``
    );
  }
};

exports.help = {
  name: "prefix",
  aliases: ["setprefix"],
  usage: `prefix`,
};
