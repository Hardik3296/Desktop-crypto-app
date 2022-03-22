/* eslint-disable @typescript-eslint/no-var-requires */
const {app, BrowserWindow} = require('electron');
const path = require('path');


//Description for the new window to be opened
const createWindow = ()=>{
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences:{
      preload :path.join(__dirname, "preload.ts"),
    },
  });

  
  // The url from where the app is to be rendered in the window
  // Condition can be set to change the production url
  const appURL = "http://localhost:3000"

  // Function to load the application
  mainWindow.loadURL(appURL);
}

// Methods that runs when the electron setup is complete
app.whenReady().then(()=>{
  // Creating the app
  createWindow();

  // Quit when all windows are closed, except on MacOS
  app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
})