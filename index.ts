import { createClient, UserEvent, MsgType, EventType, RoomEvent, ClientEvent } from "matrix-js-sdk";
import { Commands } from "./commands";
import "dotenv/config"

(async () => {
  if (!process.env.MATRIX_BASE_URL
    || !process.env.MATRIX_USER_ID
    || !process.env.MATRIX_ACCESS_TOKEN) return;

  const client = createClient({
    baseUrl: process.env.MATRIX_BASE_URL,
    userId: process.env.MATRIX_USER_ID,
    accessToken: process.env.MATRIX_ACCESS_TOKEN
  })

  try {
    client.startClient({})
    console.info("Bot is starting...")
    for (const room of client.getRooms()) {
      const id = room.roomId
      client.sendTextMessage(id, "Bot is running!")
    }
  } catch(e) {
    console.error(e)
  }

  client.on(ClientEvent.Sync, (event, state, data) => {
    switch (event) {
      case "PREPARED":
        console.info("Bot is running!");
        break;
      case "ERROR":
        console.error(`
  The bot has ran into an error!
  Error message: ${data?.error}
        `)
        break;
      case "RECONNECTING":
        console.warn("Bot is reconnecting...")
        break;
    }
  })

  const startTime = Date.now()

  await client.on(RoomEvent.Timeline, (event, room, start, removed, data) => {
    if (!room) return;
    if (event.event.sender === client.getUserId()) return;
    if (!event.event.origin_server_ts || event.event.origin_server_ts < startTime) return;
    if (!event.event.content) return;
    for (const command of Commands) {
      const splitMessage = (event.event.content.body as string).split(" ")
      if (`.${command.commandName}` === splitMessage[0]) {
        command.onRoomEvent(client, event, splitMessage.filter((_, i) => i !== 0))
      }
    }
  })
})()