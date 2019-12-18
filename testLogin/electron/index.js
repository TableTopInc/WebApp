const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const isDevMode = require('electron-is-dev');
const { CapacitorSplashScreen } = require('@capacitor/electron');
const FB = require('fb');
const url = require('url')

const path = require('path');

// Place holders for our windows so they don't get garbage collected.
let mainWindow = null;

// Placeholder for SplashScreen ref
let splashScreen = null;

//Change this if you do not wish to have a splash screen
let useSplashScreen = true;

// Create simple menu for easy devtools access, and for demo
const menuTemplateDev = [
  {
    label: 'Options',
    submenu: [
      {
        label: 'Open Dev Tools',
        click() {
          mainWindow.openDevTools();
        },
      },
    ],
  },
];

async function createWindow () {
  // Define our main window size
  mainWindow = new BrowserWindow({
    height: 920,
    width: 1600,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'node_modules', '@capacitor', 'electron', 'dist', 'electron-bridge.js')
    }
  });

  if (isDevMode) {
    // Set our above template to the Menu Object if we are in development mode, dont want users having the devtools.
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplateDev));
    // If we are developers we might as well open the devtools by default.
    mainWindow.webContents.openDevTools();
  }

  if(useSplashScreen) {
    splashScreen = new CapacitorSplashScreen(mainWindow);
    splashScreen.init(false);
  } else {
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
    mainWindow.webContents.on('dom-ready', () => {
      mainWindow.show();
    });
  }

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some Electron APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Define any IPC or other custom functionality below here

ipcMain.on('fb-authenticate', function (event, arg) {
	var options = {
		client_id: '452420362134742',
		scopes: 'email',
		redirect_uri: 'https://www.facebook.com/connect/login_success.html'
	};

	var authWindow = new BrowserWindow({
		width: 450,
		height: 300,
		show: false,
		parent: mainWindow,
		modal: true,
		webPreferences: {
			nodeIntegration: false
		}
	});
	var facebookAuthURL = `https://www.facebook.com/v3.2/dialog/oauth?client_id=${options.client_id}&redirect_uri=${options.redirect_uri}&response_type=token,granted_scopes&scope=${options.scopes}&display=popup`;

	authWindow.loadURL(facebookAuthURL);
	authWindow.webContents.on('did-finish-load', function () {
		authWindow.show();
	});

	var access_token, error;
	var closedByUser = true;

	var handleUrl = function (url) {
		var raw_code = /access_token=([^&]*)/.exec(url) || null;
		access_token = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
		error = /\?error=(.+)$/.exec(url);

		if (access_token || error) {
			closedByUser = false;
			FB.setAccessToken(access_token);
			FB.api('/me', {
				fields: ['id', 'name', 'picture.width(800).height(800)']
			}, function (res) {
				mainWindow.webContents.executeJavaScript("document.getElementById(\"fb-name\").innerHTML = \" Name: " + res.name + "\"");
				// mainWindow.webContents.executeJavaScript("document.getElementById(\"fb-id\").innerHTML = \" ID: " + res.id + "\"");
				// mainWindow.webContents.executeJavaScript("document.getElementById(\"fb-pp\").src = \"" + res.picture.data.url + "\"");
			});
			authWindow.close();
		}
	}

	authWindow.webContents.on('will-navigate', (event, url) => handleUrl(url));
	var filter = {
		urls: [options.redirect_uri + '*']
	};
	session.defaultSession.webRequest.onCompleted(filter, (details) => {
		var url = details.url;
		handleUrl(url);
	});

	authWindow.on('close', () => event.returnValue = closedByUser ? { error: 'The popup window was closed' } : { access_token, error })
})
