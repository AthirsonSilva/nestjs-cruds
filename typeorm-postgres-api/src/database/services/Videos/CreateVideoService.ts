import { Category } from '../../entities/Category'
import { Video } from '../../entities/Video'
import { AppDataSource } from '../../index'

type VideoRequest = {
	name: string
	description: string
	duration: string
	category: string
}

export class CreateVideoService {
	async execute({
		name,
		description,
		duration,
		category
	}: VideoRequest): Promise<Video | Error> {
		try {
			const videoRepository = AppDataSource.getRepository(Video)
			const categoryRepository = AppDataSource.getRepository(Category)

			const videoAlreadyExists = await videoRepository.findOne({
				where: { name: name }
			})

			const category_id = await categoryRepository
				.findOne({
					where: { name: category }
				})
				.then((category) => category.id)

			if (videoAlreadyExists) {
				return new Error(
					'Video with this name, duration and description already exists'
				)
			}

			const newVideo = videoRepository.create({
				name,
				description,
				duration,
				category_id
			})

			await videoRepository.save(newVideo)

			return newVideo
		} catch (error) {
			return new Error(error)
		}
	}
}
