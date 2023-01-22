import { Request, Response } from 'express'
import { UpdateVideoService } from '../../services/Videos/UpdateVideoService'

export class UpdateVideoController {
	async handle(
		request: Request,
		response: Response
	): Promise<Response | Error> {
		try {
			const { name, newName, description, category, duration } =
				request.body

			const videoService = new UpdateVideoService()

			const result = await videoService.execute({
				name: name,
				newName: newName,
				description: description,
				category: category,
				duration: duration
			})

			if (result instanceof Error) throw new Error(result.message)

			return response.status(201).json(result)
		} catch (error) {
			return response.status(400).json({
				error: error.message
			})
		}
	}
}
