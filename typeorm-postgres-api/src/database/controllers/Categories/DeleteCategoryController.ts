import { Request, Response } from 'express'
import { DeleteCategoryService } from '../../services/Categories/DeleteCategoryService'
import { Category } from './../../entities/Category'
import { AppDataSource } from './../../index'

export class DeleteCategoryController {
	async handle(
		request: Request,
		response: Response
	): Promise<Response | Error> {
		try {
			const { name } = request.body

			const service = new DeleteCategoryService()
			const categoryRepository = AppDataSource.getRepository(Category)

			try {
				const categoryToBeDeleted = await categoryRepository.findOne({
					where: { name: name }
				})

				if (!categoryToBeDeleted) throw new Error('Category not found')

				const result = await service.execute(categoryToBeDeleted.id)

				if (result instanceof Error) throw new Error(result.message)

				return response.status(201).json(result)
			} catch (error) {
				throw new Error(error.message as string)
			}
		} catch (error) {
			return response.status(400).json({
				error: error.message as string
			})
		}
	}
}
