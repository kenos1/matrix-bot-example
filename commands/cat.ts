import { Command } from "../commands";

export const Cat: Command = {
  commandName: "cat",
  description: "Sends a cute cat image",
  onRoomEvent(client, event, args) {
    client.sendImageMessage(event.getRoomId() ?? "", "https://cataas.com/cat")
  },
}