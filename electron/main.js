const { app, BrowserWindow, ipcMain, screen } = require('electron')
// 在你文件顶部导入 Node.js 的 path 模块
const path = require('node:path')

let mainWindow = null;
let robotWindow = null;
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,  // 必须启用
      nodeIntegration: false,  // 确保禁用 nodeIntegration
    },
  });

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, "../index.html"));
  } else {
    let url = "http://localhost:5174/"; // 本地启动的vue项目路径
    mainWindow.loadURL(url);
    // 打开开发工具
    // mainWindow.webContents.openDevTools()
  }
  // let url = " http://localhost:5174/"; // 本地启动的vue项目路径
  // mainWindow.loadURL(url);
}

function createRobotWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const robotWindow = new BrowserWindow({
    width: 600,
    height: 600,
    x: width - 600,
    y: height - 600,
    frame: false,
    transparent: true,
    hasShadow: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  let url = "http://localhost:5174/"; // 本地启动的vue项目路径
  robotWindow.loadURL(url);
  robotWindow.on('closed', () => {
    mainWindow = null;
  });
}

ipcMain.on('login-success', () => {
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