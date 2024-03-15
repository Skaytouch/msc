module.exports = async (client, textChannel, e) => {
if (textChannel){
   return textChannel?.send(`**Bir hata oluştu:** ${e.toString().slice(0, 1974)}`)
}
}
