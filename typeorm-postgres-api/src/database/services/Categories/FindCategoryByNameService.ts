import AppDataSource from '../..'
import { Category } from '../../entities/Category'

interface CategoryRequest {
	name: string
}

export class FindCategoryByNameService {
	async execute({ name }: CategoryRequest): Promise<Category | Error> {
		try {
			const categoryRepository = AppDataSource.getRepository(Category)

			const category = await categoryRepository
				.createQueryBuilder('category')
				.where('category.name like :name', { name: `%${name}%` })
				.getOne()

			if (!category) throw new Error('Category not found')

			return category
		} catch (error) {
			return new Error(error as string)
		}
	}
}
