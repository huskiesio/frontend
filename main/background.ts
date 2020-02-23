import { app, BrowserWindow } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { registerHandlers } from "./api/ipc-handler";

const isProd: boolean = process.env.NODE_ENV === "production";

app.allowRendererProcessReuse = true;

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async (): Promise<void> => {
  await app.whenReady();

  const mainWindow: BrowserWindow = createWindow("main", {
	width: 1000,
	height: 600,
  });

  if (isProd) {
	await mainWindow.loadURL("app://./home.html");
  } else {
	const port: string = process.argv[2];
	await mainWindow.loadURL(`http://localhost:${port}/home`);
	mainWindow.webContents.openDevTools();
  }

  registerHandlers(mainWindow.webContents); // Handlers are now ready to go.
})();

app.on("window-all-closed", (): void => {
  app.quit();
});
