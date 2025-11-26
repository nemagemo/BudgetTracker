import type { Stats } from '../types/electron';

interface DashboardProps {
    stats: Stats;
    onAddClick: () => void;
}

export default function Dashboard({ stats, onAddClick }: DashboardProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('pl-PL', {
            style: 'currency',
            currency: 'PLN',
        }).format(amount);
    };

    return (
        <div className="mb-8 animate-slide-in">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Dashboard</h2>
                <button
                    onClick={onAddClick}
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                    + Dodaj transakcję
                </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Balance Card */}
                <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-primary-100 text-sm font-medium">Saldo</p>
                        <svg className="w-8 h-8 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-3xl font-bold text-white">{formatCurrency(stats.balance)}</p>
                </div>

                {/* Income Card */}
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-400 text-sm font-medium">Przychody</p>
                        <svg className="w-8 h-8 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <p className="text-3xl font-bold text-success-500">{formatCurrency(stats.totalIncome)}</p>
                </div>

                {/* Expenses Card */}
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-400 text-sm font-medium">Wydatki</p>
                        <svg className="w-8 h-8 text-danger-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                    </div>
                    <p className="text-3xl font-bold text-danger-500">{formatCurrency(stats.totalExpenses)}</p>
                </div>
            </div>
        </div>
    );
}
