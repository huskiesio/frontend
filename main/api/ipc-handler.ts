/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:43 PM -- February 22nd, 2020.
 *	Project: frontend
 */

import * as filesystem from "fs";
import { ipcMain, IpcMainInvokeEvent, WebContents } from "electron";
import { HuskyChatBot } from "@huskiesio/bot";
import { IHCBotMessage as Message, IHCBotUser } from "@huskiesio/bot/dts/types";

export function registerHandlers(webContents: WebContents): void {

	let bot: HuskyChatBot = undefined as unknown as HuskyChatBot;

	ipcMain.handle("send-message", async (event: IpcMainInvokeEvent, args: { threadID: string, message: string }): Promise<string> => {

		if (bot === undefined) throw getUninitializedBotError("send-message");
		else return bot.chat().send(args.threadID, args.message);

	});

	ipcMain.handle("create-conversation", async (event: IpcMainInvokeEvent, args: {  }): Promise<any> => {

		if (bot === undefined) throw getUninitializedBotError("create-conversation");
		// else TODO [2/22/20 @ 8:22 PM] - Finish the 'new-conversation' method.

	});

	ipcMain.handle("search-users", async (event: IpcMainInvokeEvent, args: string): Promise<IHCBotUser[]> => {

		if (bot === undefined) throw getUninitializedBotError("search-users");
		else return (await bot.directory().query(args));

	});

	ipcMain.handle("set-user-avatar", async (event: IpcMainInvokeEvent, args: { filePath: string }): Promise<void> => {

		if (bot === undefined) throw getUninitializedBotError("set-user-avatar");
		else bot.info().me().avatar().set(filesystem.readFileSync(args.filePath));

	});

	ipcMain.handle("set-group-info", async (event: IpcMainInvokeEvent, args: { name?: string, tagline?: string }): Promise<void> => {

		if (bot === undefined) throw getUninitializedBotError("set-group-info");
		// else TODO [2/22/20 @ 8:27 PM] - Finish the 'set-user-avatar' method.

	});

	ipcMain.handle("sign-up", async (event: IpcMainInvokeEvent, args: { }): Promise<void> => {

		// TODO [2/22/20 @ 8:51 PM] - Finish the 'sign-up' method.

	});

	ipcMain.handle("sign-in", async (event: IpcMainInvokeEvent, args: { username: string, password: string }): Promise<void> => {

		bot = await HuskyChatBot.signIn(args.username, args.password);

	});

	bot.chat().onReceived(async (message: Message): Promise<void> => {

		webContents.send("new-message", message);

	});

	// TODO [2/22/20 @ 8:41 PM] - Add 'group-info-changed' notifier.

}

function getUninitializedBotError(functionName: string): Error {

	return new Error(
		"Attempted to call the IPC function '" + functionName + "' on an uninitialized HuskyChatBot. You must first " +
		"call the 'sign-in' IPC function on ipcMain and wait for the returned Promise to resolve."
	);

}
