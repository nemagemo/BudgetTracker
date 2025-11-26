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

export interface ElectronAPI {
    getTransactions: () => Promise<Transaction[]>;
    addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<Transaction>;
    deleteTransaction: (id: number) => Promise<boolean>;
    getStats: () => Promise<Stats>;
}

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}
