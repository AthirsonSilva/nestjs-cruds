import AppDataSource from '../..'
import { Category } from '../../entities/Category'
import { Video } from '../../entities/Video'

type VideoRequest = {
	name: string
	newName: string
	description: string
	duration: string
	category: string
}

export class UpdateVideoService {
	async execute({
		name,
		newName,
		description,
		duration,
		category
	}: VideoRequest): Promise<Video | Error> {
		try {
			const videoRepository = AppDataSource.getRepository(Video)
			const categoryRepository = AppDataSource.getRepository(Category)

			const video = await videoRepository.findOne({
				where: { name }
			})

			const category_id = await categoryRepository
				.findOne({
					where: { name: category }
				})
				.then((category) => category.id)

			if (!video) {
				throw new Error('Video not found')
			}

			const updatedVideo = await videoRepository.update(video.id, {
				name: newName,
				description: description,
				duration: duration,
				category_id: category_id
			})

			return { ...video, ...updatedVideo }
		} catch (error: unknown) {
			return new Error(error as string)
		}
	}
}
