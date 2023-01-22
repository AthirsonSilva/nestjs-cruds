import { Injectable } from '@nestjs/common'
import { team_member } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PrismaService } from 'src/database/prisma.service'
import { MembersRepositories } from '../membersRepository'

@Injectable()
export class PrismaMembersRepository extends MembersRepositories {
	constructor(private prisma: PrismaService) {
		super()
	}

	async create(name: string, memberFunction: string): Promise<team_member> {
		try {
			const newMember = await this.prisma.team_member.create({
				data: {
					id: randomUUID(),
					name: name,
					function: memberFunction,
				},
			})

			return newMember
		} catch (e) {
			throw new Error(e)
		}
	}
}
