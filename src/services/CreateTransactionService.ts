import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

/* interface Balance {
  income: number;
  outcome: number;
  total: number;
} */

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();

    const invalidTransaction = { value, type };

    if (
      invalidTransaction.type === 'outcome' &&
      invalidTransaction.value > balance.total
    ) {
      throw Error('Outcome amount can not be greater than your balance total');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
