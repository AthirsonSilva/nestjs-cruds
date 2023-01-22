import { Request, Response } from 'express'
import { CreateVideoService } from '../../services/Videos/CreateVideoService'

export class CreateVideoController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const { name, description, category, duration } = request.body
			const service = new CreateVideoService()

			const result = await service.execute({
				name,
				description,
				duration,
				category
			})

			if (result instanceof Error)
				return response.status(400).json({ error: result.message })

			return response.status(201).json(result)
		} catch (error) {
			return response.status(400).json({ error: error.message })
		}
	}
}
