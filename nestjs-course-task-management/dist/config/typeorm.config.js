"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'athirson',
    password: '',
    database: 'task-management',
    entities: [__dirname + '/../**/*.entity.ts'],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map