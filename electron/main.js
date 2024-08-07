const { app, BrowserWindow, ipcMain, screen} = require("electron");
const path = require("path");
const os = require('os');


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, "./preload.js"),
    },
  });

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../index.html"));
  } else {
    let url = "http://localhost:5174/"; // 本地启动的vue项目路径
    win.loadURL(url);
    // 打开开发工具
    // win.webContents.openDevTools()
  }

  // let url = " http://localhost:5174/"; // 本地启动的vue项目路径
  // win.loadURL(url);
}

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