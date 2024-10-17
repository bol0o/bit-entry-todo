import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Task } from '../../../entities/task';

export async function POST(req: Request) {
    const { title, description, isDone } = await req.json();
    const dataSource = await connectToDatabase();
    const todoRepo = dataSource.getRepository(Task);
    const newTodo = todoRepo.create({ title, description, isDone });
    await todoRepo.save(newTodo);
    return NextResponse.json(newTodo, { status: 201 });
}
