import { Category } from '../../entities/Category'
import { AppDataSource } from '../../index'

type CategoryRequest = {
	name: string
	description: string
}

export class CreateCategoryService {
	async execute({
		name,
		description
	}: CategoryRequest): Promise<Category | Error> {
		try {
			const repository = AppDataSource.getRepository(Category)

			const categoryAlreadyExists = await repository.findOne({
				where: { name }
			})

			if (categoryAlreadyExists) {
				return new Error('Category already exists')
			}

			const newCategory = await repository.create({ name, description })

			await repository.save(newCategory)

			return newCategory
		} catch (error) {
			return new Error(error)
		}
	}
}
