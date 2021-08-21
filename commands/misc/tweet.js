const Meme = require("memer-api");
const memer = new Meme("qpveZVDTqOA");
const Discord = require ("discord.js")
exports.execute = async (client, message, args) => {

        const user1 = message.member;

        const avatar = user1.user.displayAvatarURL({ dynamic: false })

        const text = args.join(' ');

        if (!text) return message.reply(`Please provide a text.`);

        const username = user1.user.username;

        memer.tweet(avatar, username, text).then(image => {
            const attachment = new Discord.MessageAttachment(image, "tweet.png")
            message.channel.send(attachment)
        })
    }
module.exports.help = {
    name: 'tweet',
    aliases:[],
    usage:'tweet <message>'
}