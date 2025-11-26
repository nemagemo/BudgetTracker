"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    getTransactions: () => electron_1.ipcRenderer.invoke('db:getTransactions'),
    addTransaction: (transaction) => electron_1.ipcRenderer.invoke('db:addTransaction', transaction),
    deleteTransaction: (id) => electron_1.ipcRenderer.invoke('db:deleteTransaction', id),
    getStats: () => electron_1.ipcRenderer.invoke('db:getStats'),
});
