import { Request, Response } from 'express'
import { Video } from '../../entities/Video'
import { FindVideosByNameService } from '../../services/Videos/FindVideoByName'

export class FindVideosByNameController {
	async handle(
		request: Request,
		response: Response
	): Promise<Response<Video> | Error> {
		try {
			const { name } = request.body

			const service = new FindVideosByNameService()

			const result = await service.execute({ name })

			if (result instanceof Error) throw new Error(result.message)

			return response.status(201).json(result)
		} catch (error) {
			throw new Error(error.message as string)
		}
	}
}
