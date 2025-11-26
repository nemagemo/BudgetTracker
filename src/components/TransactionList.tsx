import type { Transaction } from '../types/electron';

interface TransactionListProps {
    transactions: Transaction[];
    onDelete: (id: number) => void;
}

export default function TransactionList({ transactions, onDelete }: TransactionListProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('pl-PL', {
            style: 'currency',
            currency: 'PLN',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(date);
    };

    const getCategoryIcon = (category: string) => {
        const icons: Record<string, string> = {
            'Jedzenie': '🍔',
            'Transport': '🚗',
            'Rozrywka': '🎮',
            'Zakupy': '🛍️',
            'Zdrowie': '💊',
            'Rachunki': '📄',
            'Pensja': '💰',
            'Inne': '📦',
        };
        return icons[category] || '📦';
    };

    if (transactions.length === 0) {
        return (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
                <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-slate-400 text-lg">Brak transakcji</p>
                <p className="text-slate-500 text-sm mt-2">Dodaj swoją pierwszą transakcję, aby zacząć śledzić budżet</p>
            </div>
        );
    }

    return (
        <div className="animate-slide-in">
            <h3 className="text-2xl font-bold text-white mb-4">Ostatnie transakcje</h3>
            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700 bg-slate-900">
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Data</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Kategoria</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Opis</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">Kwota</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr
                                    key={transaction.id}
                                    className="border-b border-slate-700 hover:bg-slate-750 transition-colors"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <td className="px-6 py-4 text-sm text-slate-300">
                                        {formatDate(transaction.date)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-2 text-sm text-slate-300">
                                            <span className="text-lg">{getCategoryIcon(transaction.category)}</span>
                                            {transaction.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400">
                                        {transaction.description || '—'}
                                    </td>
                                    <td className={`px-6 py-4 text-right text-sm font-semibold ${transaction.type === 'income' ? 'text-success-500' : 'text-danger-500'
                                        }`}>
                                        {transaction.type === 'income' ? '+' : '−'} {formatCurrency(transaction.amount)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => transaction.id && onDelete(transaction.id)}
                                            className="text-slate-400 hover:text-danger-500 transition-colors p-2 rounded-lg hover:bg-slate-700"
                                            title="Usuń transakcję"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
