const db = require("../mongoDB");

module.exports = {
  name: "onceki",
  description: "Önceki parçayı çalar.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Şu anda müzik çalmıyor!!`, ephemeral: true }).catch(e => { })
      try {
        let song = await queue.previous()
        interaction.reply({ content: `**İşte, geçmişin büyüleyici melodisi!!**` }).catch(e => { })
      } catch (e) {
        return interaction.reply({ content: `❌ Önceki parça bulunamadı!!`, ephemeral: true }).catch(e => { })
      }
    } catch (e) {
      console.error(e); 
    }
  },
};
