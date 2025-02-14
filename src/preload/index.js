import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

// Custom APIs for renderer
const api = {
  exitApp: () => ipcRenderer.send("quit-app"), // Add this function
};

// Expose APIs only if context isolation is enabled
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", {
      ...electronAPI,
      exitApp: api.exitApp, // Extend electronAPI
    });
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = { ...electronAPI, exitApp: api.exitApp };
  window.api = api;
}
