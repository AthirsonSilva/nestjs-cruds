import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm'

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: '127.0.0.1',
	port: 5432,
	username: 'athirson',
	password: '',
	database: 'code_drops_crud',
	synchronize: true,
	logging: true,
	entities: ['src/database/entities/*.ts'],
	migrations: ['src/database/migrations/*.ts']
})

export const AppDataSourceRepository = (
	entity: EntityTarget<ObjectLiteral>
) => {
	return AppDataSource.getRepository(entity)
}

AppDataSource.initialize()
	.then(() => {
		console.log('Data Source has been initialized!')
	})
	.catch((err) => {
		console.error('Error during Data Source initialization', err)
	})

export default AppDataSource
