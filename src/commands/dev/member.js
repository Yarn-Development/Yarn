exports.execute = async (client, message, args, data) => {
	client.emit("guildMemberAdd", message.member);
};
exports.help = {
	name: "welcometest",
	aliases: ["test", "testwelcome"],
};
