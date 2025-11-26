import { contextBridge, ipcRenderer } from 'electron';

export interface Transaction {
    id?: number;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date: string;
    description: string;
}

export interface Stats {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
}

contextBridge.exposeInMainWorld('electronAPI', {
    getTransactions: () => ipcRenderer.invoke('db:getTransactions'),
    addTransaction: (transaction: Omit<Transaction, 'id'>) =>
        ipcRenderer.invoke('db:addTransaction', transaction),
    deleteTransaction: (id: number) =>
        ipcRenderer.invoke('db:deleteTransaction', id),
    getStats: () => ipcRenderer.invoke('db:getStats'),
});
