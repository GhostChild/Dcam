import {app, BrowserWindow, screen, ipcMain, globalShortcut} from 'electron';
import * as path from 'path';
import * as url from 'url';
// import {fork} from 'child_process';
const NodeMediaServer = require('node-media-server');
const fs = require('fs');
const playerconfig = JSON.parse(fs.readFileSync('./config/playerconfig.json'));
// logger
// const logStream = fs.createWriteStream('./log/logger.log', {flags: 'a'});
// process.stdout.write = process.stderr.write = logStream.write.bind(logStream);
// app.commandLine.appendSwitch('js-flags', '--max-old-space-size=700');
//
let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;
  // console.log(electronScreen.getPrimaryDisplay());
  // console.log(electronScreen.getAllDisplays());
  const screens = electronScreen.getAllDisplays();
  let setscreens = 0;
  if (playerconfig.display) {
    setscreens = playerconfig.display;
  }
  // Create the browser window.
  win = new BrowserWindow({
    // x: 0,
    // y: 0,
    x: screens[setscreens].bounds.x,
    y: screens[setscreens].bounds.y,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.setMenuBarVisibility(false);
  win.setFullScreenable(true);
  win.setFullScreen(true);
  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  if (serve) {
    win.webContents.openDevTools();
  }
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

}

try {
  const f = fs.readFileSync('./config/config.json');
  const videoconfig = JSON.parse(f);

  // const f = fs.readFileSync('./config/config.txt');
  // const b = Buffer.from(f.toString(), 'base64').toString();
  // const videoconfig = JSON.parse(b);

  // const start = async () => {
  //   const nms = new NodeMediaServer(videoconfig);
  //   nms.run();
  //   console.log('start');
  // };

  // start();

  ipcMain.on('getplayerconfig', (event) => {

    event.reply('setplayerconfig', playerconfig);
  });
  ipcMain.on('getvideoconfig', (event) => {
    event.reply('setvideoconfig', videoconfig);
  });
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // app.on('ready', () => {
  //   globalShortcut.register('F11', () => {
  //     console.log('pressed')
  //     win.setFullScreen();
  //   });
  // });
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

