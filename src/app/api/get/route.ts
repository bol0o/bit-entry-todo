import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Task } from '@/entities/task';
/* eslint-disable import/prefer-default-export */

export async function GET() {
    const dataSource = await connectToDatabase();
    const todoRepo = dataSource.getRepository(Task);
    const todos = await todoRepo.find();
    return NextResponse.json(todos);
}
