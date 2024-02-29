import textToSpeech from '@google-cloud/text-to-speech'
import fs from 'fs'
import util from 'util'
const client = new textToSpeech.TextToSpeechClient()
const generate = async (text) => {
  const outputFile =
    '/home/ckelet/dev/discord-DFG/nodeBot/commands/utility/output.mp3'
  const request = {
    input: { text },
    voice: {
      languageCode: 'ru-RU',
      ssmlGender: 'MALE',
      voiceName: 'ru-RU-Wavenet-B'
    },
    audioConfig: { audioEncoding: 'MP3' }
  }
  const [response] = await client.synthesizeSpeech(request)
  const writeFile = util.promisify(fs.writeFile)

  try {
    const res = await writeFile(outputFile, response.audioContent)
  } catch (e) {
    console.error('error on write, e: ', e)
  }
}

export { generate }
