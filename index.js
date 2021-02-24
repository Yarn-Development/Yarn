
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

//START OF BOT CODE//
const Discord = require("discord.js");
 const client = new Discord.Client({ disableMentions: 'everyone' });
const Eco = require("quick.eco");
const { GiveawaysManager } = require('discord-giveaways');
// Starts updating currents giveaways
const manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    updateCountdownEvery: 10000,
    hasGuildMembersIntent: false,
    default: {
        botsCanWin: false,
        exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
        embedColor: '#FF0000',
        reaction: '🎉'
    }
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;
client.eco = new Eco.Manager(); // quick.eco
client.db = Eco.db; // quick.db
client.config = require("./botConfig");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.snipes = new Discord.Collection();



  


const fs = require("fs");

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        const event = require(`./events/${f}`);
        let eventName = f.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        let command = require(`./commands/${f}`);
        client.commands.set(command.help.name, command);
        command.help.aliases.forEach(alias => {
            client.aliases.set(alias, command.help.name);
        });
    });
});
 

client.on('guildMemberAdd', member => {
        const welcomeEmbed = new Discord.MessageEmbed()

    welcomeEmbed.setColor('#5cf000')
    
    welcomeEmbed.setTitle('Welcome to BladeTrades! **' + member.user.username + '**! You are now part of the Blade Trades Server along with **' + member.guild.memberCount + '** people')
    welcomeEmbed.setImage("https://t3.ftcdn.net/jpg/02/20/14/38/360_F_220143804_fc4xRygvJ8bn8JPQumtHJieDN4ORNyjs.jpg")
    
    	member.send(welcomeEmbed).then(msg => msg.delete(5000).catch());
});
client.on('guildMemberRemove', member => {
    const goodbyeEmbed = new Discord.MessageEmbed()

    goodbyeEmbed.setColor('#f00000')
    goodbyeEmbed.setTitle('**' + member.user.username + '** has left us. At least we still have **' + member.guild.memberCount + '** legends')
    goodbyeEmbed.setImage("https://accessbydesign.uk/abd//wp-content/gallery/stock-images/goodbye.jpg")

    member.send(goodbyeEmbed)
}),
  
client.login(client.config.token);
