import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateVideos1670078370333 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'videos',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true
					},
					{
						name: 'title',
						type: 'varchar',
						isUnique: true
					},
					{
						name: 'description',
						type: 'varchar'
					},
					{
						name: 'url',
						type: 'varchar'
					},
					{
						name: 'duration',
						type: 'numeric'
					},
					{
						name: 'category_id',
						type: 'uuid'
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()'
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()'
					}
				],
				foreignKeys: [
					{
						name: 'fK_videos_category',
						columnNames: ['category_id'],
						referencedTableName: 'categories',
						referencedColumnNames: ['id']
					}
				]
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('videos')
	}

	public async refresh(queryRunner: QueryRunner): Promise<void> {
		await this.down(queryRunner)
		await this.up(queryRunner)
	}
}
