import { getRepository } from 'typeorm'

import Category from '../models/Category'

class CreateCategoryService {
  public async execute(title: string): Promise<Category> {

    const categoriesRepository = getRepository(Category)

    const checkCategoryExists = await categoriesRepository.findOne({
      where: { title }
    })

    if (checkCategoryExists) {
      return checkCategoryExists
    } else {
      const category = categoriesRepository.create({ title })
      return categoriesRepository.save(category)
    }

  }
}

export default CreateCategoryService;
