import { Request, Response } from 'express'
import { DeleteVideoService } from '../../services/Videos/DeleteVideoService'

export class DeleteVideoController {
	async handle(
		request: Request,
		response: Response
	): Promise<Response | Error> {
		try {
			const { name } = request.body

			const service = new DeleteVideoService()

			const result = await service.execute(name)

			if (result instanceof Error) throw new Error(result.message)

			return response.status(201).json(result)
		} catch (error: unknown) {
			return response.status(400).json({
				error: error
			})
		}
	}
}
