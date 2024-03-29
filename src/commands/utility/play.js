import { SlashCommandBuilder } from 'discord.js'
import { join } from 'node:path'
import {
  createAudioResource,
  createAudioPlayer,
  getVoiceConnection,
  AudioPlayerStatus,
  VoiceConnectionStatus
} from '@discordjs/voice'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
  data: new SlashCommandBuilder().setName('play').setDescription('Play music'),
  async execute(interaction) {
    const connection = getVoiceConnection(interaction.guildId)
    const resource = createAudioResource(
      join(__dirname, '/../../assets/audio/output.mp3')
    )
    const player = createAudioPlayer()

    player.play(resource)

    if (connection) {
      const subscription = connection.subscribe(player)

      connection.on(VoiceConnectionStatus.Ready, () => {
        console.log(
          'The connection has entered the Ready state - ready to play audio!'
        )
      })

      if (subscription) {
        // Unsubscribe after 5 seconds (stop playing audio on the voice connection)
        // setTimeout(() => {
        //   subscription.unsubscribe()
        //   if (connection) connection.destroy()
        //   interaction.channel.send('Disconnected from voice channel.')
        // }, 25000)
      }

      player.on(AudioPlayerStatus.Playing, () => {
        console.log('The audio player has started playing!')
      })
      player.on('error', (error) => {
        console.error(`Error: ${error.message} with resource`)
      })
      player.on(AudioPlayerStatus.Idle, () => {
        console.log('Idle')
      })
      connection.on('disconnect', () => {
        interaction.channel.send('Покинул чатик')
      })
    }
  }
}
