import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from './database/prisma.service'
import { MembersRepositories } from './repositories/membersRepository'
import { PrismaMembersRepository } from './repositories/prisma/prismaMembersRepository'

describe('AppController', () => {
	let appController: AppController

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [
				AppService,
				PrismaService,
				{
					provide: MembersRepositories,
					useClass: PrismaMembersRepository,
				},
			],
		}).compile()

		appController = app.get<AppController>(AppController)
	})

	describe('root', () => {
		it('should return "Hello World!"', () => {
			expect(appController.getHello()).toBe('Hello World!')
		})
	})
})
