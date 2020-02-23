import { IHCBotThread, IHCBotMessage, IHCBotUser } from "@huskiesio/bot/dts/types";

export interface HTMLInputEvent extends Event {
	target: HTMLInputElement & EventTarget;
}

export interface ReducedMessage {
sender: () => IHCBotUser;
messages: IHCBotMessage[];
}

export interface StuffedThread extends IHCBotThread {
  messages: IHCBotMessage[];
}
