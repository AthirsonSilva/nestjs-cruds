import { Body, Controller, Get, Post } from '@nestjs/common'
import { team_member } from '@prisma/client'
import { AppService } from './app.service'
import { PrismaService } from './database/prisma.service'
import { CreateTeamMemberBody } from './dtos/createTeamMemberBody'
import { MembersRepositories } from './repositories/membersRepository'

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private membersRepositories: MembersRepositories,
	) {}

	@Get()
	getHello(): string {
		return this.appService.getHello()
	}

	@Post('store')
	async createMember(
		@Body() body: CreateTeamMemberBody,
	): Promise<team_member> {
		try {
			if (!body.name || !body.function) {
				throw new Error('Missing name or function')
			}

			const newMember = await this.membersRepositories.create(
				body.name,
				body.function,
			)

			return newMember
		} catch (e) {
			throw new Error(e)
		}
	}
}
