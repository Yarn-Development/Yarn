const {
	Client,
	MessageEmbed,
	ContextMenuInteraction,
} = require("discord.js");
module.exports = {
	name:"userinfo",
	type:"USER",
	/**
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     */
	execute: async (client, interaction) => {
		const user = interaction.user;
		const embed = new MessageEmbed()
			.setAuthor(`${user.username} - Information`, user.displayAvatarURL({ dynamic:true }))
			.setThumbnail(user.displayAvatarURL({ dynamic:true }))
			.setDescription(`➤Username:${user.tag}\n➤ User ID: ${user.id}\n➤ Account Created: ${user.createdAt.toUTCString()}\n➤Joined Guild:${user.joinedAt.toUTCString()}\n➤Roles:[${user.roles.cache.size}] - ${user.roles.cache.map((r)=> r.name).join(", ")}`)
			.setTimestamp()
			.setColor("RANDOM")
			.setFooter(user.tag, user.displayAvatarURL({ dynamic:true }));
		interaction.followUp({ embeds:[embed] });
	},
};