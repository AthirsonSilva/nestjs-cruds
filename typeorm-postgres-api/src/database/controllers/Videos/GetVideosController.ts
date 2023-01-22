import { Request, Response } from 'express'
import { GetAllVideosService } from './../../services/Videos/GetAllVideosService'

export class GetAllVideosController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const service = new GetAllVideosService()

			const result = await service.execute()

			if (result instanceof Error)
				return response.status(400).json({ error: result.message })

			return response.status(201).json(result)
		} catch (error) {
			return response.status(400).json({ error: error.message })
		}
	}
}
