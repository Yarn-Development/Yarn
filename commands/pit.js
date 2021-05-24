require("../ExtendedMessage.js");
exports.execute = async(client,message,args) => {
  message.inlineReply('Do ymisc!donate if you like what you see! Or ymisc!issue if you have a problem.');
}
exports.help = {
  name: 'pit',
  aliases:[],
  usage:'pit <username>'
}