# 💰 Budget Tracker

Desktop application for tracking household budget built with Electron, React, TypeScript, and SQLite.

![Budget Tracker](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 📊 **Dashboard** - Overview of your finances with summary cards
- 📝 **Transaction Management** - Add, view, and delete income/expense transactions
- 📅 **Transaction History** - Complete list of all your transactions
- 📈 **Analysis View** - Placeholder for future data visualizations
- 💾 **Local Database** - All data stored locally using SQLite
- 🎨 **Modern UI** - Clean, dark-themed interface with Tailwind CSS
- 🔒 **Privacy First** - All data stays on your computer

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nemagemo/BudgetTracker.git
cd BudgetTracker
```

2. Install dependencies:
```bash
npm install
```

3. Run in development mode:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build:electron
```

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Desktop**: Electron
- **Database**: better-sqlite3
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Bundler**: electron-builder

## 📁 Project Structure

```
BudgetTracker/
├── electron/           # Electron main process files
│   ├── main.ts        # Main process entry point
│   ├── preload.cts    # Preload script
│   └── db.ts          # SQLite database logic
├── src/               # React application
│   ├── components/    # React components
│   ├── types/         # TypeScript type definitions
│   └── App.tsx        # Main application component
├── dist/              # Vite build output
└── dist-electron/     # Electron build output
```

## 💡 Usage

### Adding Transactions

1. Click the "+ Dodaj transakcję" button
2. Select transaction type (Income/Expense)
3. Enter amount, category, date, and optional description
4. Click "Dodaj" to save

### Viewing History

Click "Historia" in the sidebar to see all your transactions.

### Navigation

- **Dashboard** - Summary and recent transactions
- **Historia** - Complete transaction history
- **Analiza** - Future analytics and visualizations

## 🗄️ Database

The application uses SQLite for local data storage. The database file is located at:
```
~/Library/Application Support/budgettracker/budget.db
```

## 🔮 Future Features

- 📊 Charts and visualizations
- 💰 Budget limits and alerts
- 🎯 Savings goals
- 📤 Export to CSV/PDF
- 🔄 Recurring transactions
- 🏷️ Custom categories
- 🔐 Password protection

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**nemagemo**

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ using Electron + React + TypeScript
