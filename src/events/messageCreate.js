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

const check = new RegExp(/([a-zA-Z])\w+/)

export default {
  name: Events.MessageCreate,
  async execute(message) {
    const id = getUserFromMention(message.content)

    if (id === '1208462220296720475') {
      const msg = message.content.slice(22).trim()

      let answer = await chatApi(msg)

      const isWrongAnswer = !!check.exec(answer)

      if (isWrongAnswer) answer = 'чет сложно, а можно попроще?'

      await generate(answer)

      setTimeout(async () => {
        await Play.execute(message)
      }, 500)

      await message.reply(answer)
    }
  }
}
