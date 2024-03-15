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
      const müzikKomutlarıEmbed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setTitle('🎸 **Müzik Komutları**')
        .addFields(
          { name: '🎹 Oynat', value: 'Verilen bir bağlantıdan veya kaynaklardan bir şarkıyı yayınla' },
          { name: '⏹️ Dur', value: 'Botun müziği durdurmasını ve ses kanalından çıkmasını sağlar' },
          { name: '📊 Kuyruk', value: 'Bu sunucunun şarkı kuyruğunu görüntüle ve yönet' },
          { name: '⏭️ Atlama', value: 'Mevcut çalan şarkıyı atlamak için kullan' },
          { name: '⏸️ Duraklat', value: 'Şu anda çalan şarkıyı duraklatır' },
          { name: '▶️ Devam', value: 'Duraklatılan şarkıyı devam ettirir' },
          { name: '🔁 Döngü', value: 'Kuyruk ve mevcut şarkı için döngü modunu açar/kapatır' },
          { name: '🔄 Otomatik Oynatma', value: 'Otomatik oynatmayı etkinleştirir veya devre dışı bırakır [rastgele şarkıları çalar]' },
          { name: '⏩ Arama', value: 'Mevcut şarkıda belirli bir zamana git' },
          { name: '⏮️ Önceki', value: 'Sıradaki şarkıyı çalar' },
          { name: '🔀 Karıştır', value: 'Kuyruktaki şarkıları karıştırır' },
          { name: '📃 Çalma Listesi', value: 'çalma listelerini yönetir' }
        )

      const temelKomutlarEmbed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setTitle('✨ **Temel Komutlar**')
        .addFields(
          { name: '🏓 Ping', value: "Botun gecikmesini kontrol edin" },
          { name: '🗑️ Temizle', value: 'Bu sunucunun şarkı kuyruğunu temizler' },
          { name: '⏱️ Zaman', value: 'Mevcut şarkının oynatma süresini gösterir' },
          { name: '🎧 Filtre', value: 'Ses kalitesini artırmak için filtreleri uygular' },
          { name: '🎵 Şimdi Çalıyor', value: 'Mevcut çalan şarkı bilgilerini gösterir' },
          { name: '🔊 Ses', value: 'Müzik sesini ayarlar [yüksek sesle dinlemek risklidir]' },
        ) 
  

      interaction.reply({
        embeds: [müzikKomutlarıEmbed, temelKomutlarEmbed],
        components: [row]
      }).catch(e => {});
    } catch (e) {
      console.error(e);
    }
  },
};
