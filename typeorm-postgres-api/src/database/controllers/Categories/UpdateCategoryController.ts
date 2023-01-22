import { Request, Response } from 'express'
import { UpdateResult } from 'typeorm'
import { UpdateCategoryService } from '../../services/Categories/UpdateCategoryService'

export class UpdateCategoryController {
	async handle(
		request: Request,
		response: Response
	): Promise<UpdateResult | Response> {
		try {
			const { name, newName, description } = request.body

			const service = new UpdateCategoryService()

			const result = await service.execute({
				name,
				newName,
				description
			})

			if (result instanceof Error)
				throw new Error(result.message as string)

			return response.status(201).json({
				message: 'Category updated successfully',
				result
			})
		} catch (error) {
			return response.status(400).json({
				error: error.message as string
			})
		}
	}
}
