import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

type CreateTransactionDTO = Omit<Transaction, 'id'> & {
  total: number;
};

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({
    title,
    type,
    value,
    total,
  }: CreateTransactionDTO): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw Error('Invalid type');
    }

    if (type === 'outcome' && value > total) {
      throw Error('Value is greater than total in account');
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
