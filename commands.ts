import { MatrixClient, MatrixEvent, EventType, MsgType } from "matrix-js-sdk";
import { Echo } from "./commands/echo";
import { Dice } from "./commands/dice";
import { Help } from "./commands/help";
import { EightBall } from "./commands/eightball";
import { Cat } from "./commands/cat";

export type Command = {
  commandName: string;
  description: string;
  onRoomEvent: (
    client: MatrixClient,
    event: MatrixEvent,
    args: string[]
  ) => void;
};

export const Commands: Command[] = [
  Echo,
  Dice,
  EightBall,
  Cat,
  Help,
];
