const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1800,
        height: 1300,
        transparent: true,
        // frame: false
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})