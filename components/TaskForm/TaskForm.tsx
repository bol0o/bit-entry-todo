import React, { useState } from 'react';
import { TaskProps } from '../Task/Task';

interface TaskFormProps {
    addFormOpen: boolean,
    tasks: TaskProps[],
    setTasks: (newTasks: TaskProps[]) => void
    setAddFormOpen: (open: boolean) => void,
}

export default function TaskForm({
    addFormOpen,
    tasks,
    setTasks,
    setAddFormOpen,
}: TaskFormProps) {
    const [newTaskName, setNewTaskName] = useState<string>('');
    const [newTaskDescription, setNewTaskDescription] = useState<string>('');

    const addTask = () => {
        const taskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0;
        const newTask: TaskProps = {
            id: taskId,
            title: newTaskName.trim(),
            description: newTaskDescription.trim(),
            isDone: false,
            markAsDone: () => { },
            removeTask: () => { },
        };

        setTasks([...tasks, newTask]);
        setNewTaskName('');
        setNewTaskDescription('');
        setAddFormOpen(false);
    };

    return (
        <div className={`taskForm--mainWrapper ${addFormOpen ? 'taskForm--mainWrapper__active' : ''}`}>
            <input
                type="text"
                placeholder="Podaj tytuł zadania..."
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                disabled={!addFormOpen}
            />
            <input
                type="text"
                placeholder="Podaj opis zadania..."
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                disabled={!addFormOpen}
            />
            <button
                type="button"
                onClick={() => addTask()}
                disabled={!addFormOpen}
            >
                Dodaj
            </button>
        </div>
    );
}
