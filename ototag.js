// KOMUTLARA ATILACAK KISIM
const Discord = require('discord.js')
const db = require('quick.db')

    exports.run = (client, message, args) => {
        if(args[0] === "aç"){
            // Let
            let tag = args.slice(1).join(' ')

            // Data
            db.set(`sistem_${message.guild.id}`, 'aktif')
            db.set(`tag`, tag)

            // Mesaj
            const pâyidar = new Discord.MessageEmbed()
            .setDescription(`**Ototag Başarıyla \`${tag}\` Olarak Ayarlandı.** \n **Kapatmak İçin \`.oto-tag kapat\`**`)
            .setColor('#00ff00')
            .setFooter('Pâyidar')
            return message.channel.send(pâyidar)
        } else if(args[0] === "kapat"){
            // Data
            db.delete(`sistem_${message.guild.id}`)
            db.delete(`tag`)

            // Mesaj
            const pâyidar = new Discord.MessageEmbed()
            .setDescription(`**Ototag Başarıyla Kapatıldı.** \n **Açmak İçin \`.oto-tag aç\`**`)
            .setColor('#00ff00')
            .setFooter('Pâyidar')
            message.channel.send(pâyidar)
        }
    } //Pâyidar Code <3 ^^

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Oto-tag','OTO-TAG'],
    permLevel: 0
}
exports.help = {
    name: 'oto-tag'
}

// MAİN'E ATILACAK KISIM
client.on('guildMemberAdd', member => {
  let tag = db.fetch(`tag`)
  let sistem = db.fetch(`sistem_${member.guild.id}`)

  if(sistem === "aktif"){
    member.setNickname(tag + ` ${member.user.username}`)
  } else {
    return;
  } // Oha Pâyidar Nesin Sen Amk?
})
