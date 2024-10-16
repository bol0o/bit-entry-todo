import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/db';
import { Task } from '@/entities/task';
/* eslint-disable import/prefer-default-export */

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { isDone } = await req.json();

    const dataSource = await connectToDatabase();
    const todoRepo = dataSource.getMongoRepository(Task);
    const objectId = new ObjectId(id);
    const todo = await todoRepo.findOne({ where: { _id: objectId } });

    if (!todo) {
        return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    todoRepo.merge(todo, { isDone });
    const updatedTodo = await todoRepo.save(todo);

    return NextResponse.json(updatedTodo);
}
