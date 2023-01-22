import { team_member } from '@prisma/client'

export abstract class MembersRepositories {
	abstract create(name: string, memberFunction: string): Promise<team_member>
}
