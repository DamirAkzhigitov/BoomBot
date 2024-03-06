import { Events, MessageMentions } from 'discord.js'
import { generate } from '../utils/createAudio.js'
import Play from '../commands/utility/play.js'
import chatApi from '../utils/chatApi.js'
function getUserFromMention(mention) {
  const matches = mention
    .matchAll(MessageMentions.GlobalUsersPattern)
    .next().value

  if (!matches) return

  return matches[1]
}

export default {
  name: Events.MessageCreate,
  async execute(message) {
    const id = getUserFromMention(message.content)

    if (id === '1208462220296720475') {
      const msg = message.content.slice(22).trim()

      let answer = await chatApi(msg)

      try {
        await generate(answer)
      } catch (e) {
        console.error('error on generate: ', e)
        return await message.reply('я не смог ответить, прастите!!!')
      }

      setTimeout(async () => {
        try {
          await Play.execute(message)
        } catch (e) {
          console.error('error on play: ', e)
        }
      }, 500)

      try {
        await message.reply(answer)
      } catch (e) {
        console.error('error on reply: ', e)
      }
    }
  }
}
