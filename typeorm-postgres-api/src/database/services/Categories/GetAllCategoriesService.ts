import { AppDataSourceRepository } from '../../'
import { Category } from '../../entities/Category'

export class GetAllCategoriesService {
	async execute() {
		try {
			const repository = AppDataSourceRepository(Category)

			const categories = await repository.find()

			return categories
		} catch (error) {
			return new Error(error)
		}
	}
}
