const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB");

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { ButtonStyle } = require('discord.js');

module.exports = {
  name: "yardim",
  description: "Bot ve komutlar hakkında bilgi alın.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      const musicCommandsEmbed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setTitle('🎸 **Müzik Komutları**')
        .addFields(
          { name: '🎹 Play', value: 'Belirtilen linkten veya kaynaklardan bir şarkıyı yayınla' },
          { name: '⏹️ Dur', value: 'Botun müziği durdurmasını ve ses kanalından çıkmasını sağlar' },
          { name: '📊 Kuyruk', value: 'Bu sunucunun şarkı kuyruğunu görüntüleyip yönetin' },
          { name: '⏭️ Atlama', value: 'Mevcut çalan şarkıyı atla' },
          { name: '⏸️ Duraklat', value: 'Şu anda çalan şarkıyı duraklat' },
          { name: '▶️ Devam Et', value: 'Duraklatılmış şarkıyı devam ettir' },
          { name: '🔁 Döngü', value: 'Kuyruk ve mevcut şarkı için döngü modunu açıp kapatın' },
          { name: '🔄 Otomatik Çalma', value: 'Otomatik oynatmayı etkinleştir veya devre dışı bırakın [rastgele şarkılar çal]' },
          { name: '⏩ İlerlet', value: 'Mevcut şarkıda belirli bir zaman dilimine ilerle' },
          { name: '⏮️ Önceki', value: 'Kuyruktaki bir önceki şarkıyı çal' },
          { name: '🔀 Karıştır', value: 'Kuyruktaki şarkıları karıştır' },
          { name: '📃 Çalma Listesi', value: 'çalma listelerini yönetin' }
        )
        .setImage(`https://cdn.discordapp.com/attachments/1004341381784944703/1165201249331855380/RainbowLine.gif?ex=654f37ba&is=653cc2ba&hm=648a2e070fab36155f4171962e9c3bcef94857aca3987a181634837231500177&`); 

      const basicCommandsEmbed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setTitle('✨ **Temel Komutlar**')
        .addFields(
          { name: '🏓 Ping', value: "Botun gecikmesini kontrol edin" },
          { name: '🗑️ Temizle', value: 'Bu sunucunun şarkı kuyruğunu temizleyin' },
          { name: '⏱️ Zaman', value: 'Mevcut şarkı çalma zamanını görüntüle' },
          { name: '🎧 Filtre', value: 'Sesinizi artırmak için filtreler uygulayın' },
          { name: '🎵 Şimdi Çalan', value: 'Şu anda çalınan şarkı bilgilerini görüntüle' },
          { name: '🔊 Ses', value: 'Müzik sesini ayarlayın [yüksek sesle dinlemek risklidir]' },
        ) 
       .setImage('https://cdn.discordapp.com/attachments/1150827819547504741/1168917372267151370/standard.gif?ex=65538222&is=65410d22&hm=b4994392f44679da41fc9304eb69deaa3769e136057556deec0db69ae8d33a97&')
      const button1 = new ButtonBuilder()
        .setLabel('YouTube')
        .setURL('https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A')
        .setStyle(ButtonStyle.Link);

      const button2 = new ButtonBuilder()
        .setLabel('Discord')
        .setURL('https://discord.gg/FUEHs7RCqz')
        .setStyle(ButtonStyle.Link);

      const button3 = new ButtonBuilder()
        .setLabel('Kod')
        .setURL('https://github.com/RTX-GAMINGG/RTX-MUSIC-BOT-v3.6')
        .setStyle(ButtonStyle.Link);

      const row = new ActionRowBuilder()
        .addComponents(button1, button2, button3);

      interaction.reply({
        embeds: [musicCommandsEmbed, basicCommandsEmbed],
        components: [row]
      }).catch(e => {});
    } catch (e) {
      console.error(e);
    }
  },
};
