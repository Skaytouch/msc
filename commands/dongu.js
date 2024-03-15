const db = require("../mongoDB");
module.exports = {
  name: "dongu",
  description: "Müzik döngü modunu açar veya kapatır.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    
    try {
      const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: '⚠️ Şu anda müzik çalmıyor!!', ephemeral: true }).catch(e => { })
  
      let button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Kuyruk")
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("kuyruk"),
        new ButtonBuilder()
          .setLabel("Çalan Şarkı")
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("şimdikitarih"),
        new ButtonBuilder()
          .setLabel("Döngüyü Kapat!")
          .setStyle(ButtonStyle.Danger)
          .setCustomId("kapat")
      )

      const embed = new EmbedBuilder()
        .setColor('#fc4e03')
        .setAuthor({
        name: 'Melodilerini Döngüle'
      
    })
        .setDescription('**Döngülemeye devam ediyoruz! Müziğin hiç bitmesin. **')
     
      interaction?.reply({ embeds: [embed], components: [button], fetchReply: true }).then(async Message => {

        const filter = i => i.user.id === interaction.user.id
        let col = await Message.createMessageComponentCollector({ filter, time: 120000 });

        col.on('collect', async (button) => {
          if (button.user.id !== interaction.user.id) return
          const queue1 = client.player.getQueue(interaction.guild.id);
          if (!queue1 || !queue1.playing) {
            await interaction?.editReply({ content: '⚠️ Şu anda müzik çalmıyor!!', ephemeral: true }).catch(e => { })
            await button?.deferUpdate().catch(e => {})
          }
          switch (button.customId) {
            case 'kuyruk':
              const success = queue.setRepeatMode(2);
              interaction?.editReply({ content: `✅ Kuyruğu Döngüle!` }).catch(e => { })
              await button?.deferUpdate().catch(e => {})
              break
            case 'şimdikitarih':
              const success2 = queue.setRepeatMode(1);
              interaction?.editReply({ content: `✅ Döngüleme aktifleştirildi!!` }).catch(e => { })
              await button?.deferUpdate().catch(e => {})
              break
            case 'kapat':
              if (queue.repeatMode === 0) {
                await button?.deferUpdate().catch(e => {})
                return interaction?.editReply({ content: '⚠️ Döngü zaten Kapalı!!', ephemeral: true }).catch(e => { })
              }
              const success4 = queue.setRepeatMode(0);
              interaction?.editReply({ content: '▶️ Döngü Kapalı' }).catch(e => { })
              await button?.deferUpdate().catch(e => {})
              break
          }
        })
        col.on('end', async (button) => {
          button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setLabel("Zaman Doldu")
              .setCustomId("zamansonaerdi")
              .setDisabled(true))

          const embed = new EmbedBuilder()
            .setColor('#fc5203')
            .setTitle('▶️ Döngü Kapalı!!')
            .setTimestamp()

          await interaction?.editReply({ content: "", embeds: [embed], components: [button] }).catch(e => { });
        })
      }).catch(e => { })

    } catch (e) {
    console.error(e); 
  }
  }
}
