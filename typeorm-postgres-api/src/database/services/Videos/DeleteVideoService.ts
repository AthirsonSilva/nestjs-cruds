import AppDataSource from '../..'
import { Video } from '../../entities/Video'

type VideoRequest = {
	name: string
}

export class DeleteVideoService {
	async execute({ name }: VideoRequest): Promise<Video | Error> {
		try {
			const videoRepository = AppDataSource.getRepository(Video)

			const videoToBeDeleted = await videoRepository.findOne({
				where: { name: name }
			})

			if (!videoToBeDeleted) {
				return new Error('Video not found')
			}

			await videoRepository.delete(videoToBeDeleted.id)

			return videoToBeDeleted
		} catch (error) {
			return new Error(error)
		}
	}
}
