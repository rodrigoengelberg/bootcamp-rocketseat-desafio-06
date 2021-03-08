import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'

import Transaction from '../models/Transaction'
import TransactionsRepository from '../repositories/TransactionsRepository'
import CreateCategoriesService from './CreateCategoryService'

interface Request {
  title: string,
  value: number,
  type: 'income' | 'outcome',
  category: string
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {

    const transactionsRepository = getCustomRepository(TransactionsRepository)

    const {total} = await transactionsRepository.getBalance()

    if (type === 'outcome' && total < value)
      throw new AppError("You don't have enough balance")

    const createCategoriesService = new CreateCategoriesService()

    const categoryBase = await createCategoriesService.execute(category)

    const transaction = transactionsRepository.create({ title, value, type, category: categoryBase})

    await transactionsRepository.save(transaction)

    return transaction

  }
}

export default CreateTransactionService;
