const db = require('quick.db')
const Discord = require('discord.js')
module.exports.execute = async (client,message,args) => {

          
                const newNickname = (`[AFK] ${message.member.displayName}`);

                message.member.setNickname(newNickname).catch(err => {
                  console.error
                })
                
let content = args.join(" ")
        await db.set(`afk-${message.author.id}+${message.guild.id}`, content)
        if (!content){
  content = 'AFK'
  await db.set(`afk-${message.author.id}+${message.guild.id}`, content);
};
      
        message.channel.send(`I have set you as afk\n**Reason :** ${content}\nSee you later!`)
       
          const startTime = Date.now();
          module.exports = startTime

        
        
}
module.exports.help  = {
  name: "afk",
  aliases:[],
  category:'Misc',
  usage: `afk or ymisc!afk <Your afk message>`
}
