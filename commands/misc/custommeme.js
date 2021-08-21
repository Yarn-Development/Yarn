const Discord = require("discord.js");

exports.execute = async (client, message, args) => {
  const memetemplate = args[0];
  if (!memetemplate) {
    return message.channel.send(
      "You didn't mention the template!. To see the available meme templates, type `ymisc!memetemplates`"
    );
  }
  const memetext1 = args[1];
  if (!memetext1) {
    return message.channel.send("Enter the text to be placed at the top!");
  }
  const memetext2 = args[2];
  if (!memetext2) {
    return message.channel.send("Enter the text to be placed at the bottom!");
  }
  message.channel.send({
    files: [
      {
        attachment: `https://api.memegen.link/images/${memetemplate}/${memetext1}/${memetext2}`,
        name: "custommeme.png",
      },
    ],
  });
};
module.exports.help = {
  name: "creatememe",
  description: "Create Custom Memes",
  aliases: ["custommeme", "cm"],
  category: "Misc",
  usage: "creatememe <template> text>",
};
