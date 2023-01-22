import { Request, Response } from 'express'
import { FindCategoryByNameService } from '../../services/Categories/FindCategoryByNameService'

export class FindCategoryByNameController {
	async handle(
		request: Request,
		response: Response
	): Promise<Response | Error> {
		try {
			const { name } = request.body

			const service = new FindCategoryByNameService()

			const result = await service.execute({ name })

			if (result instanceof Error)
				throw new Error(result.message as string)

			return response.status(201).json(result)
		} catch (error) {
			return response.status(400).json({ error: error.message })
		}
	}
}
