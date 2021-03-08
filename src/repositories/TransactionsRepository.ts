import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {

    const transactions = await this.find()

    const totalIncome = transactions.reduce((accum, curr) => curr.type === 'income' ? Number(accum) + Number(curr.value) : accum, 0)

    const totalOutcome = transactions.reduce((accum, curr) => curr.type === 'outcome' ? Number(accum) + Number(curr.value) : accum, 0)

    const total = totalIncome - totalOutcome

    return { income: totalIncome, outcome: totalOutcome, total }
  }
}

export default TransactionsRepository;
