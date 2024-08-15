"use strict";
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (channel, data) => {
      ipcRenderer.send(channel, data);
    },
    on: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    off: (channel, func) => {
      ipcRenderer.removeListener(channel, func);
    },
    invoke: async (channel, data) => {
      return await ipcRenderer.invoke(channel, data);
    }
  }
});
