import { Repository } from 'typeorm'
import { Category } from '../entities/Category'

export class CategoryRepository extends Repository<Category> {
	async createAndSave(name: string, description: string): Promise<Category> {
		const category = this.create({ name, description })
		await this.save(category)
		return category
	}

	async deleteAndSave(id: string): Promise<void> {
		await this.delete(id)
	}

	async updateAndSave(category: Category, id: string): Promise<Category> {
		const categoryToBeUpdated = await this.findOne({
			where: { id }
		})
		categoryToBeUpdated.name = category.name
		await this.save(categoryToBeUpdated)
		return categoryToBeUpdated
	}

	async listAll(): Promise<Category[]> {
		const categories = await this.find()
		return categories
	}

	async findByName(name: string): Promise<Category> {
		const category = await this.findOne({
			where: { name }
		})
		return category
	}

	async findVideosByCategory(category_id: string): Promise<Category> {
		const category = await this.findOne({
			where: { id: category_id },
			relations: ['videos']
		})
		return category
	}
}
