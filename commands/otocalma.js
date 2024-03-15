const db = require("../mongoDB");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "otocalma",
  description: "Oynatma sırasının otomatik oynatmasını açar/kapatır.",
  options: [],
  permissions: "0x0000000000000800",
  run: async (client, interaction) => {
    try {
      const queue = client?.player?.getQueue(interaction?.guild?.id);
      if (!queue || !queue?.playing) {
        return interaction?.reply({ content: '⚠️ Şu anda müzik çalmıyor!!', ephemeral: true });
      }
      
      queue?.toggleAutoplay();
      
      const embed = new EmbedBuilder()
        .setColor('#2f58fe')
        .setTitle('Senin Müziğin, Senin Kararın!!')
        .setDescription(queue?.autoplay ? '**✅ Otoçalma AÇIK**' : '**❌ Otoçalma KAPALI**')
        
      
      interaction?.reply({ embeds: [embed] });
    } catch (e) {
      console.error(e);
    }
  },
};
