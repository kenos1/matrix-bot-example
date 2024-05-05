import { EventType, MsgType } from "matrix-js-sdk";
import { Command } from "../commands";

const messages: ["yes" | "maybe" | "no", string][] = [
  ["yes", "It is certain"],
  ["yes", "It is decidedly so"],
  ["yes", "Without a doubt"],
  ["yes", "Yes definitely"],
  ["yes", "You may rely on it"],
  ["yes", "As I see it, yes"],
  ["yes", "Most likely"],
  ["yes", "Outlook good"],
  ["yes", "Yes"],
  ["yes", "Signs point to yes"],
  ["maybe", "Reply hazy, try again"],
  ["maybe", "Ask again later"],
  ["maybe", "Better not tell you now"],
  ["maybe", "Cannot predict now"],
  ["maybe", "Concentrate and ask again"],
  ["no", "Don’t count on it"],
  ["no", "My reply is no"],
  ["no", "My sources say no"],
  ["no", "Outlook not so good"],
  ["no", "Very doubtful"],
];

export const EightBall: Command = {
  commandName: "8ball",
  description: "A fortune telling device that you can ask your questions to",
  onRoomEvent(client, event, args) {
    const message = messages[Math.floor(Math.random() * messages.length)];
    client.sendEvent(event.getRoomId() ?? "", EventType.RoomMessage, {
      body: `🎱 ${message[1]}`,
      format: "org.matrix.custom.html",
      formatted_body: `🎱 <span data-mx-color="${(() => {
        switch (message[0]) {
          case "yes":
            return "#00FF00";
          case "maybe":
            return "#FFFF00";
          case "no":
            return "#FF0000";
        }
      })()}">${message[1]}</span>`,
      msgtype: MsgType.Text,
    });
  },
};
