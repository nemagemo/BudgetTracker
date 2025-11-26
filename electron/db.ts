import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'path';
import fs from 'fs';

let db: Database.Database;

export function initDatabase() {
    const userDataPath = app.getPath('userData');
    const dbPath = path.join(userDataPath, 'budget.db');

    // Ensure the directory exists
    fs.mkdirSync(userDataPath, { recursive: true });

    db = new Database(dbPath);

    // Create tables if they don't exist
    db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      description TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_date ON transactions(date);
    CREATE INDEX IF NOT EXISTS idx_type ON transactions(type);
  `);

    console.log('Database initialized at:', dbPath);
}

export function getTransactions() {
    const stmt = db.prepare('SELECT * FROM transactions ORDER BY date DESC, id DESC');
    return stmt.all();
}

export function addTransaction(transaction: {
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date: string;
    description: string;
}) {
    const stmt = db.prepare(`
    INSERT INTO transactions (amount, type, category, date, description)
    VALUES (@amount, @type, @category, @date, @description)
  `);
    const result = stmt.run(transaction);
    return { id: result.lastInsertRowid, ...transaction };
}

export function deleteTransaction(id: number) {
    const stmt = db.prepare('DELETE FROM transactions WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
}

export function getStats() {
    const incomeStmt = db.prepare(`
    SELECT COALESCE(SUM(amount), 0) as total 
    FROM transactions 
    WHERE type = 'income'
  `);
    const expenseStmt = db.prepare(`
    SELECT COALESCE(SUM(amount), 0) as total 
    FROM transactions 
    WHERE type = 'expense'
  `);

    const income = (incomeStmt.get() as { total: number }).total;
    const expenses = (expenseStmt.get() as { total: number }).total;

    return {
        totalIncome: income,
        totalExpenses: expenses,
        balance: income - expenses,
    };
}
