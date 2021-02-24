
   exports.execute = async (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You are not allowed to run this command");

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        let role = message.guild.roles.cache.find(x => x.name === "Muted");

        if(user.roles.cache.has(role)) return message.channel.send("This member isn't muted");

        user.roles.remove(role);

        message.channel.send(`${user} has been unmuted`)
    }
    module.exports.help = {
      name:'unmute',
      aliases:[],
      usage:'unmute @user'
    }

