const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
  name: "sira",
  description: "Sıra listesini gösterir.",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    
    try {
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: '⚠️ Şu anda müzik çalmıyor!!', ephemeral: true }).catch(e => { })
      if (!queue.songs[0]) return interaction.reply({ content: '⚠️ Sıra boş!!', ephemeral: true }).catch(e => { })

      const trackl = []
      queue.songs.map(async (track, i) => {
        trackl.push({
          title: track.name,
          author: track.uploader.name,
          user: track.user,
          url: track.url,
          duration: track.duration
        })
      })

      const backId = "emojiGeri"
      const forwardId = "emojiİleri"
      const backButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        emoji: "⬅️",
        customId: backId
      });

      const deleteButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        emoji: "❌",
        customId: "kapat"
      });

      const forwardButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        emoji: "➡️",
        customId: forwardId
      });


      let kaçtane = 8
      let sayfa = 1
      let a = trackl.length / kaçtane

      const generateEmbed = async (başlangıç) => {
        let sayı = sayfa === 1 ? 1 : sayfa * kaçtane - kaçtane + 1
        const current = trackl.slice(başlangıç, başlangıç + kaçtane)
        if (!current || !current?.length > 0) return interaction.reply({ content: '⚠️ Sıra boş!!', ephemeral: true }).catch(e => { })
        return new EmbedBuilder()
          .setTitle(`${interaction.guild.name}  Sıra`)
          .setThumbnail(interaction.guild.iconURL({ size: 2048, dynamic: true }))
          .setColor(client.config.embedColor)
          .setDescription(`▶️ Şu an çalıyor: \`${queue.songs[0].name}\`
    ${current.map(data =>
            `\n\`${sayı++}\` | [${data.title}](${data.url}) | (<@${data.user.id}> tarafından gerçekleştirildi)`
          )}`)
          .setFooter({ text: `Sayfa ${sayfa}/${Math.floor(a + 1)}` })
      }

      const birSayfayaSığabilir = trackl.length <= kaçtane

      await interaction.reply({
        embeds: [await generateEmbed(0)],
        components: birSayfayaSığabilir
          ? []
          : [new ActionRowBuilder({ components: [deleteButton, forwardButton] })],
        fetchReply: true
      }).then(async Message => {
        const filtre = i => i.user.id === interaction.user.id
        const toplayıcı = Message.createMessageComponentCollector({ filtre, time: 120000 });


        let mevcutİndeks = 0
        toplayıcı.on("collect", async (button) => {
          if (button?.customId === "kapat") {
            toplayıcı?.stop()
           return button?.reply({ content: 'Komut iptal edildi', ephemeral: true }).catch(e => { })
          } else {

            if (button.customId === backId) {
              sayfa--
            }
            if (button.customId === forwardId) {
              sayfa++
            }

            button.customId === backId
              ? (mevcutİndeks -= kaçtane)
              : (mevcutİndeks += kaçtane)

            await interaction.editReply({
              embeds: [await generateEmbed(mevcutİndeks)],
              components: [
                new ActionRowBuilder({
                  components: [
                    ...(mevcutİndeks ? [backButton] : []),
                    deleteButton,
                    ...(mevcutİndeks + kaçtane < trackl.length ? [forwardButton] : []),
                  ],
                }),
              ],
            }).catch(e => { })
            await button?.deferUpdate().catch(e => { })
          }
        })

        toplayıcı.on("end", async (button) => {
          button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("⬅️")
              .setCustomId(backId)
              .setDisabled(true),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("❌")
              .setCustomId("kapat")
              .setDisabled(true),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("➡️")
              .setCustomId(forwardId)
              .setDisabled(true))

          const embed = new EmbedBuilder()
            .setTitle('Komut Zaman Aşımı')
            .setColor(`#ecfc03`)
            .setDescription('▶️ Sıra komutunu tekrar çalıştırın!!')
          return interaction?.editReply({ embeds: [embed], components: [button] }).catch(e => { })

        })
      }).catch(e => { })

    } catch (e) {
    console.error(e); 
  }
  }
}
