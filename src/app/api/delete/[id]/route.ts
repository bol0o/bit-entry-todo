import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/db';
import { Task } from '@/entities/task';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    const dataSource = await connectToDatabase();
    const todoRepo = dataSource.getRepository(Task);

    const objectId = new ObjectId(id);

    const result = await todoRepo.delete(objectId);

    if (result.affected === 0) {
        return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 });
}
