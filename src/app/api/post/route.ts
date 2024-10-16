import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Task } from '../../../entities/task';
/* eslint-disable import/prefer-default-export */

export async function POST(req: Request) {
    const { title, description, completed } = await req.json();
    const dataSource = await connectToDatabase();
    const todoRepo = dataSource.getRepository(Task);
    const newTodo = todoRepo.create({ title, description, completed });
    await todoRepo.save(newTodo);
    return NextResponse.json(newTodo, { status: 201 });
}
