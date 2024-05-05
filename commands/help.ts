import { Command, Commands } from "../commands";
import { MsgType, EventType } from "matrix-js-sdk";

export const Help: Command = {
  commandName: "help",
  description: "Gives help",
  onRoomEvent(client, event, args) {
    client.sendEvent(event.getRoomId() ?? "", EventType.RoomMessage, {
      body: Commands.map(
        (command) => `.${command.commandName}: ${command.description}`
      ).join("\n"),
      format: "org.matrix.custom.html",
      formatted_body: Commands.map(
        (command) =>
          `<code>.${command.commandName}</code>: <i>${command.description}</i>`
      ).join("<br>"),
      msgtype: MsgType.Text,
    });
  },
};
