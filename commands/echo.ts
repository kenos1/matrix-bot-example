import { Command } from "../commands";
import { MsgType, EventType } from "matrix-js-sdk";

export const Echo: Command = {
  commandName: "echo",
  description: "Sends back the same message the user passed in",
  onRoomEvent(client, event, args) {
    client.sendEvent(event.getRoomId() ?? "", EventType.RoomMessage, {
      body: args.join(" "),
      msgtype: MsgType.Text,
    });
  },
};
