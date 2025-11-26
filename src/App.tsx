import { useState, useEffect } from 'react';
import './index.css';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import AddTransactionModal from './components/AddTransactionModal';
import Analysis from './components/Analysis';
import type { Transaction, Stats } from './types/electron';

// Mock data for browser testing (when electronAPI is not available)
const mockTransactions: Transaction[] = [];
const mockStats: Stats = { totalIncome: 0, totalExpenses: 0, balance: 0 };

type View = 'dashboard' | 'history' | 'analysis';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [stats, setStats] = useState<Stats>(mockStats);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<View>('dashboard');

  // Check if we're running in Electron or browser
  const isElectron = typeof window !== 'undefined' && window.electronAPI;

  const loadData = async () => {
    if (!isElectron) {
      // Browser mode - use mock data
      setIsLoading(false);
      return;
    }

    try {
      const [txns, statistics] = await Promise.all([
        window.electronAPI.getTransactions(),
        window.electronAPI.getStats(),
      ]);
      setTransactions(txns);
      setStats(statistics);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    if (!isElectron) {
      // Browser mode - add to local state
      const newTransaction: Transaction = {
        ...transaction,
        id: Date.now(),
      };
      setTransactions([newTransaction, ...transactions]);

      // Update stats
      if (transaction.type === 'income') {
        setStats({
          totalIncome: stats.totalIncome + transaction.amount,
          totalExpenses: stats.totalExpenses,
          balance: stats.balance + transaction.amount,
        });
      } else {
        setStats({
          totalIncome: stats.totalIncome,
          totalExpenses: stats.totalExpenses + transaction.amount,
          balance: stats.balance - transaction.amount,
        });
      }

      setIsModalOpen(false);
      return;
    }

    try {
      await window.electronAPI.addTransaction(transaction);
      await loadData();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  const handleDeleteTransaction = async (id: number) => {
    if (!isElectron) {
      // Browser mode - remove from local state
      const txn = transactions.find(t => t.id === id);
      if (txn) {
        setTransactions(transactions.filter(t => t.id !== id));

        // Update stats
        if (txn.type === 'income') {
          setStats({
            totalIncome: stats.totalIncome - txn.amount,
            totalExpenses: stats.totalExpenses,
            balance: stats.balance - txn.amount,
          });
        } else {
          setStats({
            totalIncome: stats.totalIncome,
            totalExpenses: stats.totalExpenses - txn.amount,
            balance: stats.balance + txn.amount,
          });
        }
      }
      return;
    }

    try {
      await window.electronAPI.deleteTransaction(id);
      await loadData();
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <div className="text-slate-400 text-lg">Ładowanie...</div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <>
            <Dashboard stats={stats} onAddClick={() => setIsModalOpen(true)} />
            <TransactionList
              transactions={transactions.slice(0, 5)}
              onDelete={handleDeleteTransaction}
            />
          </>
        );
      case 'history':
        return (
          <div className="animate-slide-in">
            <h2 className="text-3xl font-bold text-white mb-6">Historia transakcji</h2>
            <TransactionList
              transactions={transactions}
              onDelete={handleDeleteTransaction}
            />
          </div>
        );
      case 'analysis':
        return <Analysis />;
      default:
        return null;
    }
  };

  const NavButton = ({ view, label, icon }: { view: View; label: string; icon: React.ReactNode }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${currentView === view
        ? 'bg-primary-600 text-white'
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <>
      <div className="flex h-screen bg-slate-900">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
          <div className="p-6 border-b border-slate-700">
            <h1 className="text-2xl font-bold text-white">Budget Tracker</h1>
            <p className="text-sm text-slate-400 mt-1">Zarządzaj swoimi finansami</p>
            {!isElectron && (
              <p className="text-xs text-amber-500 mt-2">⚠️ Tryb przeglądarkowy (dane tymczasowe)</p>
            )}
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <NavButton
              view="dashboard"
              label="Dashboard"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              }
            />
            <NavButton
              view="history"
              label="Historia"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <NavButton
              view="analysis"
              label="Analiza"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
          </nav>

          <div className="p-4 border-t border-slate-700">
            <p className="text-xs text-slate-500">v1.0.0</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <AddTransactionModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTransaction}
        />
      )}
    </>
  );
}

export default App;
