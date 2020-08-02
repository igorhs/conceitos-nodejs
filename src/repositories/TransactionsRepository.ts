import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    const balanceTransactions = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            break;
          default:
            break;
        }

        const total = accumulator.income - accumulator.outcome;

        accumulator.total = total;

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balanceTransactions;
  }

  /* public invalidTransaction({type: 'income' | 'outcome'}: CreateTransactionDTO): Transaction | null {
    const transactions = this.transactions.find(
      type === 'outcome',
    );

    const invalidTransaction = this.transactions.find(
      transactions?.value > total,
    );

    return invalidTransaction;
    if (invalidTransaction?.value > total){
      return null;
    }

    return transactions || null;
  } */

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
