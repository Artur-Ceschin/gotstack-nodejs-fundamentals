import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;

    const balance = transactions.reduce(
      (acc: Balance, transaction: Transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.value;
          acc.total += transaction.value;
        } else {
          acc.outcome += transaction.value;
          acc.total -= transaction.value;
        }

        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const newTransaction = new Transaction({ title, type, value });

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
