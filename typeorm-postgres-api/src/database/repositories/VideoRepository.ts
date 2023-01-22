import { Repository } from 'typeorm'
import { AppDataSourceRepository } from '..'
import { Video } from '../entities/Video'

export default class extends Repository<Video> {
	async createAndSave(
		name: string,
		description: string,
		duration: string,
		category: string
	): Promise<Video> {
		const categoryRepository = AppDataSourceRepository(Video)

		const category_id = await categoryRepository
			.findOne({ where: { name: category } })
			.then((category) => category.id)

		const video = this.create({
			name,
			description,
			duration,
			category_id
		})
		await this.save(video)
		return video
	}

	async listAll(): Promise<Video[]> {
		const videos = await this.find()
		return videos
	}

	async deleteAndSave(id: string): Promise<void> {
		await this.delete(id)
	}

	async updateAndSave(video: Video, id: string): Promise<Video> {
		const videoToBeUpdated = await this.findOne({
			where: { id }
		})
		videoToBeUpdated.name = video.name
		await this.save(videoToBeUpdated)
		return videoToBeUpdated
	}

	async findByName(name: string): Promise<Video> {
		const video = await this.findOne({
			where: { name }
		})
		return video
	}

	async findVideosByCategory(): Promise<Video[]> {
		const videos = await this.find({
			relations: ['category']
		})

		return videos
	}
}
