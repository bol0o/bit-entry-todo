import {
    Entity,
    ObjectId,
    ObjectIdColumn,
    Column,
} from 'typeorm';
import { IsBoolean, IsString } from 'class-validator';

@Entity()
export class Task {
    @ObjectIdColumn()
        id!: ObjectId;

    @Column()
    @IsString()
        title!: string;

    @Column()
    @IsString()
        description!: string;

    @Column()
    @IsBoolean()
        isDone: boolean = false;
}
