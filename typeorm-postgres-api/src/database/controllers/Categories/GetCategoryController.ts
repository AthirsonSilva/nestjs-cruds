import { Request, Response } from 'express'
import { GetAllCategoriesService } from '../../services/Categories/GetAllCategoriesService'

export class GetAllCategoriesController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const service = new GetAllCategoriesService()

			const result = await service.execute()

			if (result instanceof Error)
				return response.status(400).json({ error: result.message })

			return response.status(201).json(result)
		} catch (error) {
			return response.status(400).json({ error: error.message })
		}
	}
}
