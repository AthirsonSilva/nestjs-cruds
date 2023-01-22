import { AppDataSource } from '../../'
import { Video } from '../../entities/Video'

type VideoRequest = {
	name: string
}

export class FindVideosByNameService {
	async execute({ name }: VideoRequest): Promise<Video | Error> {
		try {
			const videoRepository = AppDataSource.getRepository(Video)

			const video = await videoRepository.findOne({
				where: { name }
			})

			const videoQuery = await videoRepository
				.createQueryBuilder()
				.select('video')
				.from(Video, 'video')
				.where('video.name = :name', { name: name })
				.innerJoinAndSelect('video.category', 'category')
				.getOne()

			if (!video) {
				return new Error('Video not found')
			}

			return videoQuery
		} catch (error) {
			throw new Error(error.message as string)
		}
	}
}
