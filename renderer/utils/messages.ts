import {ipcRenderer} from "electron";
import { IHCBotMessage } from "@huskiesio/bot/dts/types";

export const sendMessage = (msg: IHCBotMessage) => {
  return ipcRenderer.invoke("send-message", msg);
};
