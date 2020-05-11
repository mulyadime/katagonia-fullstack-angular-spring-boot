"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
const { app, BrowserWindow } = require("electron")
const path = require("path")
const url = require("url")
const args = process.argv.slice(1)
const serve = args.some(function (val) {
    return val === '--serve'
})
console.log(serve)

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        x: 0,
        y: 0,
        width: 1330,
        height: 750,
        maximizable: false,
        minimizable: false,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: true,
        }
    })

    if (serve) {
        require('electron-reload')(
            __dirname,
            { electron: require(__dirname + "/node_modules/electron") }
        )
        win.center()
        win.loadURL('http://localhost:4200')

    } else {
        win.center()
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'dist/index.html'),
                protocol: 'file:',
                slashes: true
            })
        )

    }

    // Uncomment below to open the DevTools.
    // win.webContents.openDevTools()

    // Event  when the window is closed.
    win.on('closed', function () { win = null })

    return win
}

try {
    // Create window on electrion initialization
    app.on('ready', createWindow)

    // Quit when all windows are closed.
    app.on('window-all-closed', function () {
        // on macOS specific close process
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', function () {
        // macOS specific close process
        if (win === null) createWindow()
    })
} catch (error) {
    // throw(error)
}