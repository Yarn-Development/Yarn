const {
    CommandInteraction,
    MessageEmbed,
    Client
} = require("discord.js")

module.exports = {
    name:"serverinfo",
    description:"Display information for your server",
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    execute: async(client,interaction) => {
        function CheckBots(guild) {
            let botCount = 0;
            guild.members.cache.forEach(member => {
                if(member.user.bot) botCount ++
            });
            return botCount;
        }
        function CheckMembers(guild) {
            let memberCount = 0;
            guild.members.cache.forEach(member =>{
                if(!member.user.bot) memberCount++

            });
            return memberCount;
        }
        function CheckOnlineUsers(guild) {
            let onlineCount = 0;
            guild.members.cache.forEach((member) => {
                if (member.user.presence.status === "online") onlineCount++;
            });
            return onlineCount;
        }

        const embed = new MessageEmbed()
        .setTitle(`${interaction.guild.name} - Server Information`)
        .setThumbnail(interaction.guild.iconURL)
        .addField("Owner",interaction.guild.owner)
        .addField("Region",interaction.guild.region)
        .addField("Total Users",interaction.guild.memberCount.toString())
        .addField("Bots",CheckBots(interaction.guild).toString())
        .addField("Users",CheckMembers(interaction.guild).toString())
        .addField("Online Users",CheckOnlineUsers(interaction.guild).toString())
        .setFooter(`Guild Created: ${interaction.guild.createdAt.toUTCString()}`)
        interaction.followUp({ embeds:[embed] })
    }

}