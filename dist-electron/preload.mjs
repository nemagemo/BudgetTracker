import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('electronAPI', {
    getTransactions: () => ipcRenderer.invoke('db:getTransactions'),
    addTransaction: (transaction) => ipcRenderer.invoke('db:addTransaction', transaction),
    deleteTransaction: (id) => ipcRenderer.invoke('db:deleteTransaction', id),
    getStats: () => ipcRenderer.invoke('db:getStats'),
});
