const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const maxVol = require("../config.js").opt.maxVol;
const db = require("../mongoDB.js");

module.exports = {
  name: "ses",
  description: "Müzik sesini ayarlamanızı sağlar.",
  permissions: "0x0000000000000800",
  options: [{
    name: 'ses',
    description: 'Sesi ayarlamak için bir sayı yazın.',
    type: ApplicationCommandOptionType.Integer,
    required: true
  }],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) {
        return interaction.reply({ content: '⚠️ Müzik çalmıyor!!', ephemeral: true });
      }

      const vol = parseInt(interaction.options.getInteger('ses'));

      if (!vol) {
        return interaction.reply({
          content: `Mevcut ses: **${queue.volume}** 🔊\nSesi değiştirmek için, \`1\` ile \`${maxVol}\` arasında bir sayı yazın.`,
          ephemeral: true
        });
      }

      if (queue.volume === vol) {
        return interaction.reply({ content: 'Mevcut ses zaten **' + vol + '** olarak ayarlanmış!', ephemeral: true });
      }

      if (vol < 1 || vol > maxVol) {
        return interaction.reply({
          content: `Lütfen \`1\` ile \`${maxVol}\` arasında bir sayı yazın.`,
          ephemeral: true
        });
      }

      const success = queue.setVolume(vol);

      if (success) {
        const embed = new EmbedBuilder()
          .setColor('#d291fe')
          .setAuthor({
            name: 'Sizin Müziğiniz! Sizin Kurallarınız!',
            iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157528025739563088/5657-volume-icon.png?ex=6518ef7b&is=65179dfb&hm=1797c2830537a28b5c6a57564517cc509146d02383a69fb4239d7b5d55aceeed&', 
            url: 'https://discord.gg/FUEHs7RCqz'
          })
          .setDescription(`**Ses Ayarlanıyor : ** **${vol}/${maxVol}**`);

        return interaction.reply({ embeds: [embed] });
      } else {
        return interaction.reply({ content: '❌ Ses değiştirilirken bir sorun oluştu.', ephemeral: true });
      }
    } catch (e) {
      console.error(e);
    }
  },
};
