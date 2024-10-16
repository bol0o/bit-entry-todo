import { DataSource } from 'typeorm';
import { Task } from './src/entities/task';

require('dotenv').config();

/* eslint-disable import/prefer-default-export */

export const AppDataSource = new DataSource({
    type: 'mongodb',
    url: process.env.MONGODB_URL,
    useNewUrlParser: true,
    synchronize: true,
    logging: true,
    entities: [Task],
    useUnifiedTopology: true,
});
