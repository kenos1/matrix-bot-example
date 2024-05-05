import { Command } from "../commands";
import { MsgType, EventType } from "matrix-js-sdk";

export const Dice: Command = {
  commandName: "dice",
  description:
    "Rolls a dice. You can specify the amount of sides by adding a number as an argument of the command",
  onRoomEvent(client, event, args) {
    const sides = (() => {
      const parsed = parseInt(args[0]);
      if (isNaN(parsed)) return 6;
      return parsed;
    })();
    client.sendEvent(event.getRoomId() ?? "", EventType.RoomMessage, {
      body: `🎲 The dice rolled a ${Math.floor(Math.random() * sides) + 1}!`,
      msgtype: MsgType.Text,
    });
  },
};
