import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from './database/prisma.service'
import { MembersRepositories } from './repositories/membersRepository'
import { PrismaMembersRepository } from './repositories/prisma/prismaMembersRepository'

@Module({
	imports: [],
	controllers: [AppController],
	providers: [
		AppService,
		PrismaService,
		{
			provide: MembersRepositories,
			useClass: PrismaMembersRepository,
		},
	],
})
export class AppModule {}
