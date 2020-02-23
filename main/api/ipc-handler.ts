/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	6:43 PM -- February 22nd, 2020.
 *	Project: frontend
 */

import * as filesystem from "fs";
import { ipcMain, IpcMainInvokeEvent, WebContents } from "electron";
import { HCBotInfoMe, HuskyChatBot } from "@huskiesio/bot";
import { IHCBotThread, IHCBotUser } from "@huskiesio/bot/dts/types";
import { HCBotChatOnReceivedParam } from "@huskiesio/bot/dts/chat/HCBotChat";

export type SignUpFields = {
	
	email: string,
	password: string,
	firstName: string,
	lastName: string,
	deviceName: string
	
};

export type UserInfo = {
	
	id: string,
	username: string,
	firstName: string,
	lastName: string,
	avatar: Buffer
	
};

export type ThreadUpdateNotification = {
	
	threadID: string,
	name: string,
	tagline: string
	
};

export function registerHandlers(webContents: WebContents): void {

	let bot: HuskyChatBot = undefined as unknown as HuskyChatBot;
	
	HuskyChatBot.SOCKET_ADDRESS = "141.219.220.40:3000";
	
	ipcMain.handle("send-message", async (event: IpcMainInvokeEvent, args: { threadID: string, message: string }): Promise<void> => {
		
		if (bot === undefined) throw getUninitializedBotError("send-message");
		else await bot.chat().send(args.threadID, args.message);
		
	});

	ipcMain.handle("create-conversation", async (event: IpcMainInvokeEvent, args: { name: string, description: string, members: string[] }): Promise<string> => {

		if (bot === undefined) throw getUninitializedBotError("create-conversation");
		else return bot.chat().createThread(args.name, args.description, args.members);

	});

	ipcMain.handle("search-users", async (event: IpcMainInvokeEvent, args: string): Promise<IHCBotUser[]> => {

		if (bot === undefined) throw getUninitializedBotError("search-users");
		else return (await bot.directory().query(args));

	});

	ipcMain.handle("set-user-avatar", async (event: IpcMainInvokeEvent, args: { filePath: string }): Promise<void> => {

		if (bot === undefined) throw getUninitializedBotError("set-user-avatar");
		else bot.info().me().avatar().set(filesystem.readFileSync(args.filePath));

	});
	
	ipcMain.handle("set-group-info", async (event: IpcMainInvokeEvent, args: { threadID: string, name: string, tagline: string }): Promise<void> => {
		
		if (bot === undefined) throw getUninitializedBotError("set-group-info");
		// else TODO [2/22/20 @ 8:27 PM] - Finish the 'set-group-info' method.
		
	});
	
	ipcMain.handle("sign-up-start", async (event: IpcMainInvokeEvent, args: SignUpFields): Promise<string> => {
		
		return HuskyChatBot.signUpStart(args);
		
	});
	
	ipcMain.handle("sign-up-finish", async (event: IpcMainInvokeEvent, args: { code: string, token: string }): Promise<void> => {
		
		return HuskyChatBot.signUpFinish(args.code, args.token);
		
	});
	
	ipcMain.handle("sign-in", async (event: IpcMainInvokeEvent, args: { username: string, password: string }): Promise<void> => {
		
		bot = await HuskyChatBot.signIn(args.username, args.password);
		
	});
	
	ipcMain.handle("is-signed-in", async (event: IpcMainInvokeEvent, args: void): Promise<boolean> => {
		
		return (bot !== undefined);
		
	});
	
	ipcMain.handle("get-user-info", async (event: IpcMainInvokeEvent, args: void): Promise<UserInfo> => {
		
		let me: HCBotInfoMe = bot.info().me();
		
		return {
			
			id: await me.userId(),
			username: await me.username(),
			firstName: await me.firstName(),
			lastName: await me.lastName(),
			avatar: await me.avatar().get()
			
		};
		
	});
	
	bot.chat().onReceived(async (message: HCBotChatOnReceivedParam): Promise<boolean> => {
		
		webContents.send("new-message", message);

	});
	
	bot.chat().onThreadUpdated(async(threadID: string): Promise<void> => {
		
		let thread: IHCBotThread = await bot.chat().getThreadForId(threadID) as IHCBotThread;
		
		let update: ThreadUpdateNotification = {
			
			threadID,
			name: thread.name(),
			tagline: thread.description()
			
		};
		
		webContents.send("group-info-changed", update);
		
	});

}

function getUninitializedBotError(functionName: string): Error {

	return new Error(
		"Attempted to call the IPC function '" + functionName + "' on an uninitialized HuskyChatBot. You must first " +
		"call the 'sign-in' IPC function on ipcMain and wait for the returned Promise to resolve."
	);

}
