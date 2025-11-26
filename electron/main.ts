import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import * as db from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null = null;

function createWindow() {
    // In development, preload is in dist-electron, in production it's in the same dir as main
    const preloadPath = process.env.VITE_DEV_SERVER_URL
        ? path.join(app.getAppPath(), 'dist-electron', 'preload.cjs')
        : path.join(__dirname, 'preload.cjs');

    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            preload: preloadPath,
            contextIsolation: true,
            nodeIntegration: false,
        },
        titleBarStyle: 'hiddenInset',
        backgroundColor: '#0f172a',
    });

    // In development, load from Vite dev server
    if (process.env.VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
        mainWindow.webContents.openDevTools();
    } else {
        // In production, load the built files
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Initialize database when app is ready
app.whenReady().then(() => {
    db.initDatabase();
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// IPC Handlers for database operations
ipcMain.handle('db:getTransactions', async () => {
    return db.getTransactions();
});

ipcMain.handle('db:addTransaction', async (_, transaction) => {
    return db.addTransaction(transaction);
});

ipcMain.handle('db:deleteTransaction', async (_, id) => {
    return db.deleteTransaction(id);
});

ipcMain.handle('db:getStats', async () => {
    return db.getStats();
});
