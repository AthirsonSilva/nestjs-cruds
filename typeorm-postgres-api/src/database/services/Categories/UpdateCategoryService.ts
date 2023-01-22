import AppDataSource from '../..'
import { Category } from '../../entities/Category'

type CategoryRequest = {
	name: string
	newName: string
	description: string
}

export class UpdateCategoryService {
	async execute({
		name,
		newName,
		description
	}: CategoryRequest): Promise<Category | Error> {
		try {
			const repository = AppDataSource.getRepository(Category)

			const categoryToBeUpdated = await repository.findOne({
				where: { name }
			})

			if (!categoryToBeUpdated) throw new Error('Category not found')

			await repository.update(categoryToBeUpdated.id, {
				name: newName,
				description
			})

			return await repository.findOne({
				where: { name: newName }
			})
		} catch (error) {
			throw new Error(error)
		}
	}
}
