import textToSpeech from '@google-cloud/text-to-speech'
import fs from 'fs'
import util from 'util'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
const client = new textToSpeech.TextToSpeechClient()
const __dirname = dirname(fileURLToPath(import.meta.url))

const generate = async (text) => {
  const outputFile = join(__dirname, '/../assets/audio/output.mp3')
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
    await writeFile(outputFile, response.audioContent)
  } catch (e) {
    console.error('error on write, e: ', e)
  }
}

export { generate }
