import {
    Entity,
    ObjectId,
    ObjectIdColumn,
    Column,
} from 'typeorm';
import { IsBoolean, IsString } from 'class-validator';
/* eslint-disable import/prefer-default-export */

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
