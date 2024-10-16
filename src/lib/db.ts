import { DataSource } from 'typeorm';
import { AppDataSource } from '../../ormconfig';
/* eslint-disable import/prefer-default-export */

let dataSource: DataSource;

export const connectToDatabase = async () => {
    if (!dataSource) {
        dataSource = await AppDataSource.initialize();
    }
    return dataSource;
};
