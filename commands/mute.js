

exports.execute = async (client, message, args) => {
  
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don\'t have permission to run this command");

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!user) message.channel.send("This user can't be found anywhere in this server");

        if(user.id === message.author.id) return message.channel.send("You cannot mute yourself you imbecile");

        let role = message.guild.roles.cache.find(x => x.name === "Muted");

        if(!role) return message.channel.send("Cannot find the muted role");

        let reason = args.slice(1).join(" ");
        if(reason === null) reason = "Unspecified"

        user.roles.add(role);

        await message.channel.send(`${user} has been muted for the following reason: ${reason}`)

        user.send(`Hello there. You have been muted from ${message.guild.name} for the following reason: ${reason}`);
    }

exports.help = {
    name: "mute",
    aliases: ["m"],
    usage: `mute @user <time>`
}
