import {
  screen,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Display
} from "electron";
import * as Store from "electron-store";

export default (windowName: string, options: BrowserWindowConstructorOptions): BrowserWindow => {
  const key: string = "window-state";
  const name: string = `window-state-${windowName}`;
  const store: Store = new Store({ name });

  interface WindowSize {
	height: integer;
	width: integer;
  }

  interface Position {
	x: integer;
	y: integer;
  height: integer;
	width: integer;
  }

  const defaultSize: WindowSize = {
	height: options.height,
	width: options.width,
  };

  let state: Position = {};
  let win: BrowserWindow;

  const restore: Function = (): WindowSize => store.get(key, defaultSize);

  const getCurrentPosition: Function = (): Position => {
	const position: integer[] = win.getPosition();
	const size: integer[] = win.getSize();
	return {
		x: position[0],
		y: position[1],
	height: size[1],
		width: size[0],
	};
  };

  const windowWithinBounds: Function = (windowState: Position, bounds: Position): boolean => {
	return (
		windowState.x >= bounds.x &&
		windowState.y >= bounds.y &&
		windowState.x + windowState.width <= bounds.x + bounds.width &&
		windowState.y + windowState.height <= bounds.y + bounds.height
	);
  };

  const resetToDefaults: Function = (): Position => {
	const bounds: WindowSize = screen.getPrimaryDisplay().bounds;
	return Object.assign({}, defaultSize, {
		x: (bounds.width - defaultSize.width) / 2,
		y: (bounds.height - defaultSize.height) / 2,
	});
  };

  const ensureVisibleOnSomeDisplay: Function = (windowState: WindowSize): WindowSize => {
	const visible: boolean = screen.getAllDisplays().some((display: Display): boolean => {
		return windowWithinBounds(windowState, display.bounds);
	});
	if (!visible) {
		// Window is partially or fully not visible now.
		// Reset it to safe defaults.
		return resetToDefaults();
	}
	return windowState;
  };

  const saveState: Function = (): void => {
	if (!win.isMinimized() && !win.isMaximized()) {
		Object.assign(state, getCurrentPosition());
	}
	store.set(key, state);
  };

  state = ensureVisibleOnSomeDisplay(restore());

  const browserOptions: BrowserWindowConstructorOptions = {
	...options,
	...state,
	webPreferences: {
		nodeIntegration: true,
		...options.webPreferences,
	},
  };

  win = new BrowserWindow(browserOptions);

  win.on("close", saveState);

  return win;
};
