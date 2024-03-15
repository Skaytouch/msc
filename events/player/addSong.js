const db = require("../../mongoDB");
const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, şarkı) => {
  if (queue) {
    if (!client.config.opt.loopMessage && queue?.repeatMode !== 0) return;
    if (queue?.textChannel) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: 'Sıraya Eklendi'
        })
        .setDescription(`<@${şarkı.user.id}>, **${şarkı.name}**`)
        .setColor('#14bdff')
        .setFooter({ text: 'Daha Fazla Bilgi İçin /sira Komutunu Kullanın' });
      queue?.textChannel?.send({ embeds: [embed] }).catch(e => { });
    }
  }
}
