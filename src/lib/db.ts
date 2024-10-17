import { DataSource } from 'typeorm';
import { AppDataSource } from '../../ormconfig';

let dataSource: DataSource;

export const connectToDatabase = async () => {
    if (!dataSource) {
        dataSource = await AppDataSource.initialize();
    }
    return dataSource;
};
