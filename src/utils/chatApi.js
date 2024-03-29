import config from '../config.json' assert { type: 'json' }

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${config.chatKey}`
}
const fetchChat = async (text) => {
  let response = {}
  const options = {
    model: config.model,
    max_tokens: 512,
    top_p: 1,
    top_k: 40,
    presence_penalty: 0,
    frequency_penalty: 0,
    temperature: 0.8,
    messages: [
      {
        content: 'Помощник который отвечает на русском языке',
        role: 'system'
      },
      {
        content: text,
        role: 'user'
      }
    ]
  }
  try {
    response = await fetch(config.chatAPI, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(options)
    })
    response = await response.json()
    response = response.choices[0].message.content
  } catch (e) {
    console.error(e)
  }

  return response
}

export default async (text) => {
  return await fetchChat(text)
}
