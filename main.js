const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Vytvorit nove okno aplikace
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  // Naplnit okno konkretnim HTML souborem
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Reakce na zavreni okna
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// Inicializace elektronu je dokoncena okno se muze otevrit
app.on('ready', createWindow)

// Implementace specialniho chovani pro Mac OS X
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
