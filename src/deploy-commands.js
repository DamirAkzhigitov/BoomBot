import { REST, Routes } from 'discord.js'
import config from './config.json' assert { type: 'json' }

import Join from './commands/utility/join.js'
import Leave from './commands/utility/leave.js'
import Play from './commands/utility/play.js'

const commands = [Join, Leave, Play]
const commandsJSON = []

commands.forEach((command) => {
  if ('data' in command && 'execute' in command) {
    commandsJSON.push(command.data.toJSON())
  }
})

const rest = new REST().setToken(config.token)

// and deploy your commands!
;(async () => {
  try {
    console.log(
      `Started refreshing ${commandsJSON.length} application (/) commands.`
    )

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationCommands(config.clientId), {
      body: commandsJSON
    })

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    )
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error)
  }
})()
