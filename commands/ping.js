const { EmbedBuilder } = require('discord.js')
const db = require("../mongoDB");

module.exports = {
  name: "ping",
  description: "bot gecikmesini kontrol eder",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {
      const başlangıç = Date.now();
      interaction.reply("Pingleme....").then(msg => {
        const son = Date.now();
        const embed = new EmbedBuilder()
          .setColor(`#6190ff`)
          .setTitle(`Bot Gecikmesi`)
          .setDescription(`**Pong** : ${son - başlangıç}ms`)
        return interaction.editReply({ embeds: [embed] }).catch(e => { });
      }).catch(err => { })
    } catch (e) {
      console.error(e); 
    }
  },
};
