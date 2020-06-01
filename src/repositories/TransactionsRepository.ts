import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
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
    const income = this.transactions.reduce((incomeAccum, transaction) => {
      if (transaction.type === 'income') {
        return incomeAccum + transaction.value;
      }

      return incomeAccum;
    }, 0);

    const outcome = this.transactions.reduce((outcomeAccum, transaction) => {
      if (transaction.type === 'outcome') {
        return outcomeAccum + transaction.value;
      }

      return outcomeAccum;
    }, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
