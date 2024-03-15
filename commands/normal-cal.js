const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
  name: "normal-cal",
  description: "Bir parça çal.",
  permissions: "0x0000000000000800",
  options: [
    {
      name: "normal",
      description: "Diğer platformlardan müzik aç.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "name",
          description: "Müziğinizi yazın.",
          type: ApplicationCommandOptionType.String,
          required: true
        }
      ]
    },
    {
      name: "calmalistesi",
      description: "Çalma listesi adını yazın.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "name",
          description: "Oluşturmak istediğiniz çalma listesinin adını yazın.",
          type: ApplicationCommandOptionType.String,
          required: true
        }
      ]
    },
  ],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      let stp = interaction.options.getSubcommand()

      if (stp === "calmalistesi") {
        let playlistw = interaction.options.getString('name')
        let playlist = await db?.playlist?.find().catch(e => { })
        if (!playlist?.length > 0) return interaction.reply({ content: `Liste yok. ❌`, ephemeral: true }).catch(e => { })

        let arr = 0
        for (let i = 0; i < playlist.length; i++) {
          if (playlist[i]?.playlist?.filter(p => p.name === playlistw)?.length > 0) {

            let playlist_owner_filter = playlist[i].playlist.filter(p => p.name === playlistw)[0].author
            let playlist_public_filter = playlist[i].playlist.filter(p => p.name === playlistw)[0].public

            if (playlist_owner_filter !== interaction.member.id) {
              if (playlist_public_filter === false) {
                return interaction.reply({ content: `Bu çalma listesini çalmak için izniniz yok. ❌`, ephemeral: true }).catch(e => { })
              }
            }

            const music_filter = playlist[i]?.musics?.filter(m => m.playlist_name === playlistw)
            if (!music_filter?.length > 0) return interaction.reply({ content: `İsimle müzik bulunamadı.`, ephemeral: true }).catch(e => { })
                const listembed = new EmbedBuilder()
                .setTitle('Çalma Listesi Yükleniyor')
                .setColor('#FF0000')
                .setDescription('**🎸 Müzikal bir yolculuğa hazır olun!**');
            interaction.reply({ content : '', embeds: [listembed] }).catch(e => { })

            let songs = []
            music_filter.map(m => songs.push(m.music_url))

            setTimeout(async () => {
              const playl = await client?.player?.createCustomPlaylist(songs, {
                member: interaction.member,
                properties: { name: playlistw, source: "custom" },
                parallel: true
              });
              const qembed = new EmbedBuilder()
        .setAuthor({
        name: 'Çalma Listesine Şarkılar Katarak Kuyruğa Eklendi'
    })
        .setColor('#14bdff')
        .setFooter({ text: 'Daha Fazla Bilgi için /kuyruk kullanın' });
           
              await interaction.editReply({ content: '',embeds: [qembed] }).catch(e => {
                  console.error('Yanıtı düzenlerken hata:', e);
                });

              try {
                await client.player.play(interaction.member.voice.channel, playl, {
                  member: interaction.member,
                  textChannel: interaction.channel,
                  interaction
                })
              } catch (e) {
                await interaction.editReply({ content: `❌ Sonuç bulunamadı!!`, ephemeral: true }).catch(e => { })
              }

              playlist[i]?.playlist?.filter(p => p.name === playlistw).map(async p => {
                await db.playlist.updateOne({ userID: p.author }, {
                  $pull: {
                    playlist: {
                      name: playlistw
                    }
                  }
                }, { upsert: true }).catch(e => { })

                await db.playlist.updateOne({ userID: p.author }, {
                  $push: {
                    playlist: {
                      name: p.name,
                      author: p.author,
                      authorTag: p.authorTag,
                      public: p.public,
                      plays: Number(p.plays) + 1,
                      createdTime: p.createdTime
                    }
                  }
                }, { upsert: true }).catch(e => { })
              })
            }, 3000)
          } else {
            arr++
            if (arr === playlist.length) {
              return interaction.reply({ content: `Çalma Listesi bulunamadı ❌`, ephemeral: true }).catch(e => { })
            }
          }
        }
      }

      if (stp === "normal") {
        const name = interaction.options.getString('name');
        if (!name) {
          return interaction.reply({ content: '▶️ Metin veya bağlantı verin', ephemeral: true }).catch(e => {});
        }

        const embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setDescription('**🎸 Müzikal bir yolculuğa hazır olun!**');

        await interaction.reply({ embeds: [embed] }).catch(e => {});

        try {
          await client.player.play(interaction.member.voice.channel, name, {
            member: interaction.member,
            textChannel: interaction.channel,
            interaction
          });
        } catch (e) {
          const errorEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setDescription('❌ Sonuç bulunamadı!!');

          await interaction.editReply({ embeds: [errorEmbed], ephemeral: true }).catch(e => {});
        }
      }
    }  catch (e) {
      console.error(e); 
    }
  },
};
