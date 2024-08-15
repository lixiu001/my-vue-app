"use strict";
const { app, BrowserWindow, ipcMain, screen } = require("electron");
const path = require("node:path");
let mainWindow = null;
let robotWindow = null;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      // 必须启用
      nodeIntegration: false
      // 确保禁用 nodeIntegration
    }
  });
  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, "../index.html"));
  } else {
    let url = "http://localhost:5174/";
    mainWindow.loadURL(url);
  }
}
function createRobotWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  robotWindow = new BrowserWindow({
    width: 600,
    height: 600,
    x: width - 600,
    y: height - 600,
    frame: false,
    transparent: true,
    hasShadow: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });
  let url = "http://localhost:5174/";
  robotWindow.loadURL(url);
  robotWindow.on("closed", () => {
    mainWindow = null;
  });
}
ipcMain.on("login-success", () => {
  if (mainWindow) {
    mainWindow.close();
  }
  createRobotWindow();
});
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
