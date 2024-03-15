const { EmbedBuilder } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
  name: "calan",
  description: "şu anda çalan şarkının bilgisini alır.",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {

      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Şu anda müzik çalmıyor!!`, ephemeral: true }).catch(e => { })

      const parça = queue.songs[0];
      if (!parça) return interaction.reply({ content: `⚠️ Şu anda müzik çalmıyor!!`, ephemeral: true }).catch(e => { })

      const embed = new EmbedBuilder();
      embed.setColor(client.config.embedColor);
      embed.setThumbnail(parça.thumbnail);
      embed.setTitle(parça.name)
      embed.setDescription(`> **Ses** \`%${queue.volume}\`
> **Süre :** \`${parça.formattedDuration}\`
> **URL :** **${parça.url}**
> **Döngü Modu :** \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Tüm Kuyruk' : 'Bu Şarkı') : 'Kapalı'}\`
> **Filtre**: \`${queue.filters.names.join(', ') || 'Kapalı'}\`
> **Oluşturan :** <@${parça.user.id}>`);

      interaction.reply({ embeds: [embed] }).catch(e => { })

    }  catch (e) {
    console.error(e); 
  }
  },
};
