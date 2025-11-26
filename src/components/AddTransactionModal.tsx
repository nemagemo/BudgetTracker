import { useState } from 'react';
import type { Transaction } from '../types/electron';

interface AddTransactionModalProps {
    onClose: () => void;
    onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
}

const CATEGORIES = {
    expense: ['Jedzenie', 'Transport', 'Rozrywka', 'Zakupy', 'Zdrowie', 'Rachunki', 'Inne'],
    income: ['Pensja', 'Freelance', 'Inwestycje', 'Prezent', 'Inne'],
};

export default function AddTransactionModal({ onClose, onSubmit }: AddTransactionModalProps) {
    const [type, setType] = useState<'income' | 'expense'>('expense');
    console.log('AddTransactionModal rendering');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!amount || !category) {
            alert('Wypełnij wszystkie wymagane pola');
            return;
        }

        onSubmit({
            type,
            amount: parseFloat(amount),
            category,
            description,
            date,
        });
    };

    const categories = CATEGORIES[type];

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-700">
                    <h3 className="text-2xl font-bold text-white">Dodaj transakcję</h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Type Toggle */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Typ transakcji</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setType('expense');
                                    setCategory('');
                                }}
                                className={`py-3 px-4 rounded-lg font-medium transition-all ${type === 'expense'
                                    ? 'bg-danger-600 text-white shadow-lg'
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                    }`}
                            >
                                Wydatek
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setType('income');
                                    setCategory('');
                                }}
                                className={`py-3 px-4 rounded-lg font-medium transition-all ${type === 'income'
                                    ? 'bg-success-600 text-white shadow-lg'
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                    }`}
                            >
                                Przychód
                            </button>
                        </div>
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Kwota <span className="text-danger-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="0.00"
                                required
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">PLN</span>
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Kategoria <span className="text-danger-500">*</span>
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                        >
                            <option value="">Wybierz kategorię</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Data</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Opis (opcjonalnie)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                            placeholder="Dodaj notatkę..."
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
                        >
                            Anuluj
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
                        >
                            Dodaj
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
