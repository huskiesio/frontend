import {StuffedThread} from "../types";
import { IHCBotUser, IHCBotThread, IHCBotMessage } from "@huskiesio/bot/dts/types";

export const loadThreads = async (): Promise<StuffedThread[]> => {
  const user: IHCBotUser = {
		firstName: () => "Max",
		lastName: () => "Isom",
		username: () => "mtisom",
		avatar: () => Promise.resolve(Buffer.from("")),
		publicKey: () => Buffer.from("asdf"),
		id: "1",
		createdAt: new Date().getTime(),
		updatedAt: new Date().getTime(),
	};

  const thread: IHCBotThread = {
	name: () => "Test Thread",
	description: () => "Catchy tagline",
	id: "1",
	createdAt: new Date().getTime(),
	updatedAt: new Date().getTime(),
  };

  const msg: IHCBotMessage = {
	sender: () => user,
	thread: () => thread,
	payload: () => "**Bolded text**",
	timestamp: () => new Date().getTime()
  };

  const seed = [
	{
		...thread,
		messages: [msg]
	}
  ];

  return seed;
};
