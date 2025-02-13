const { app, BrowserWindow, screen } = require('electron')

let win = null;

const createWindow = () => {
    const relWinSize = 400;
    const primaryDisplay = screen.getPrimaryDisplay()
    const {width, height} = primaryDisplay.workAreaSize;
        win = new BrowserWindow({
            width: width-relWinSize*2.8,
            height: height-relWinSize,
            transparent: true,
            frame: false
        })
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})