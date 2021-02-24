const Discord = require('discord.js')
const db = require('quick.db')

module.exports.execute = async (client, message, args) => {
    if(!message.content.startsWith('bt!'))return;  

    const embed = new Discord.MessageEmbed()
    .setDescription(`**Input a Leaderboard Option**\n\nCoin Leaderboard: bt!leaderboard coins\nFresh Nikes Leaderboard: bt!leaderboard nikes\nCar Leaderboard: bt!leaderboard car\nMansion Leaderboard: bt!leaderboard mansion`)
    .setColor("#FFFFFF")


  if(!args[0]) return message.channel.send(embed)

    if (args[0] == 'coins') {
    let money = db.has(`money_${message.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < money.length; i++) {
        let user = client.users.get(money[i].ID.split('_')[2]).username

      

        content += `${i+1}. ${user} ~ ${money[i].data}\n`
    
      }

    const embed = new Discord.MessageEmbed()
    .setDescription(`**${message.guild.name}'s Coin Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    message.channel.send(embed)
  } else if(args[0] == 'nikes') {
    let nike = db.has(`nikes_${message.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < nike.length; i++) {
        let user = client.users.get(nike[i].ID.split('_')[2]).username

        content += `${i+1}. ${user} ~ ${nike[i].data}\n`
    }

    const embed = new Discord.MessageEmbed()
    .setDescription(`**${message.guild.name}'s Fresh Nikes Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    message.channel.send(embed)
  } else if(args[0] == 'car') {
    let cars = db.has(`car_${message.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < cars.length; i++) {
        let user = client.users.get(cars[i].ID.split('_')[2]).username

        content += `${i+1}. ${user} ~ ${cars[i].data}\n`
    }

    const embed = new Discord.MessageEmbed()
    .setDescription(`**${message.guild.name}'s Car Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    message.channel.send(embed)
  } else if(args[0] == 'mansion') {
    let mansions = db.has(`house_${message.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < mansions.length; i++) {
        let user = client.users.get(mansions[i].ID.split('_')[2]).username

        content += `${i+1}. ${user} ~ ${mansions[i].data}\n`
    }

    const embed = new Discord.MessageEmbed()
    .setDescription(`**${message.guild.name}'s Mansion Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    message.channel.send(embed)
  }

}

exports.help = {
  name:'leaderboard',
  aliases:['lb'],
  usage: 'leaderboard'
}