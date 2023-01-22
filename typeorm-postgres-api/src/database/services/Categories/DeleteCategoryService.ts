import { AppDataSource } from '../../'
import { Video } from '../../entities/Video'
import { Category } from './../../entities/Category'

export class DeleteCategoryService {
	async execute(id: string): Promise<Category | Error> {
		try {
			const categoryRepository = AppDataSource.getRepository(Category)
			const videoRepository = AppDataSource.getRepository(Video)

			const categoryToBeDeleted = await categoryRepository.findOne({
				where: { id: id }
			})

			try {
				console.log(categoryToBeDeleted)

				const videosToBeUpdated = await videoRepository.find({
					where: { category_id: id }
				})

				const temporaryCategory = await categoryRepository
					.findOne({
						where: { name: 'Temporary category' }
					})
					.then((category: Category): string => category.id)

				videosToBeUpdated.forEach(async (video: Video) => {
					await videoRepository.update(video.id, {
						category_id: temporaryCategory
					})
				})
			} catch (error) {
				console.log(error)

				throw new Error(
					('Error while updating videos: ' + error) as string
				)
			}

			if (!categoryToBeDeleted) {
				return new Error('Category not found')
			}

			await categoryRepository.delete(categoryToBeDeleted.id)

			return categoryToBeDeleted
		} catch (error) {
			return new Error(error)
		}
	}
}
