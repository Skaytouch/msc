const db = require("../mongoDB");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "duraklat",
  description: "Şu anda çalan müziği duraklatır.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    const queue = client.player.getQueue(interaction.guild.id);

    try {
      if (!queue || !queue.playing) {
        return interaction.reply({ content: '⚠️ Şu anda müzik çalmıyor!!', ephemeral: true });
      }

      const success = queue.pause();

      const embed = new EmbedBuilder()
        .setColor('#7645fe') 
        .setAuthor({
          name: 'Şarkı Duraklatıldı'
         
        })
        .setDescription(success ? '**Müzik bir süreliğine Duraklatıldı!!**' : '❌ Komut Hatası: Şarkı duraklatılamadı')
        

      return interaction.reply({ embeds: [embed] });
    } catch (e) {
      console.error(e);
    }
  },
};
