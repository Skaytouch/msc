const db = require("../../mongoDB");
const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, song) => {
  if (queue) {
    if (!client.config.opt.loopMessage && queue?.repeatMode !== 0) return;
    if (queue?.textChannel) {
      const embed = new EmbedBuilder()
      .setAuthor({
        name: 'Şu anda bir parça çalınıyor',
  
    })
    .setDescription(`\n ‎ \n▶️ **Detaylar:** **${song?.name}**\n▶️ **Müziğin En Üstün Deneyimini Yaşayın. ** \n▶️ **Eğer bağlantı bozulursa, sorgu verin.**`)
    .setImage(queue.songs[0].thumbnail)
    .setColor('#FF0000')
    .setFooter({ text: 'Daha fazla bilgi - /yardim komutunu kullanın ' });
     
      queue?.textChannel?.send({ embeds: [embed] }).catch(e => { });
    }
  }
}

