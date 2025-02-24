import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  exitApp: () => ipcRenderer.send('quit-app') // Add this function
}

// Expose APIs only if context isolation is enabled
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', {
      ...electronAPI,
      exitApp: api.exitApp, // Extend electronAPI
      openFilePicker: () => ipcRenderer.invoke('open-file-picker'),
      readFile: (path) => ipcRenderer.invoke('read-file', path),
      writeFile: (path, data) => ipcRenderer.invoke('write-file', path, data),
      relativeWriteFile: (path, data) => ipcRenderer.invoke('relative-write-file', path, data),
      relativeReadFile: (path) => ipcRenderer.invoke('relative-read-file', path)
    })
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = { ...electronAPI, exitApp: api.exitApp }
  window.api = api
}
