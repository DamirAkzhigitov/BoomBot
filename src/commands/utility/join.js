import { SlashCommandBuilder } from 'discord.js'
import { joinVoiceChannel } from '@discordjs/voice'

export default {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Join to voice channel!'),
  async execute(interaction) {
    const connection = joinVoiceChannel({
      channelId: interaction.channelId,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator
    })

    setTimeout(async () => {
      connection.destroy()
    }, 300000)

    await interaction.reply('BoomBot зашел (на 5 мин)')
  }
}
