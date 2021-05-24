require("../ExtendedMessage.js")

exports.execute = async(client,message,args) => {
  message.inlineReply("Monke")
}
exports.help = {
  name: "harambe",
  aliases:[],
  category:'Custom',
  usage:'harambe'
}