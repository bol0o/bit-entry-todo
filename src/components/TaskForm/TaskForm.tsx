import React, { useState } from 'react';
import { TaskProps } from '../Task/Task';

interface TaskFormProps {
    addFormOpen: boolean,
    tasks: TaskProps[],
    disabled: boolean,
    setDisabled: (isDisabled: boolean) => void,
    setTasks: (newTasks: TaskProps[]) => void
    setAddFormOpen: (open: boolean) => void,
}

export default function TaskForm({
    addFormOpen,
    tasks,
    disabled,
    setDisabled,
    setTasks,
    setAddFormOpen,
}: TaskFormProps) {
    const [newTaskName, setNewTaskName] = useState<string>('');
    const [newTaskDescription, setNewTaskDescription] = useState<string>('');

    const addTask = async () => {
        setDisabled(true);

        const newTask: Partial<TaskProps> = {
            title: newTaskName.trim(),
            description: newTaskDescription.trim(),
            isDone: false,
            markAsDone: () => { },
            removeTask: () => { },
        };

        const res = await fetch('/api/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask),
        });

        const savedTask = await res.json();

        setTasks([...tasks, savedTask]);
        setNewTaskName('');
        setNewTaskDescription('');
        setAddFormOpen(false);

        setDisabled(false);
    };

    return (
        <div className={`taskForm--mainWrapper ${addFormOpen ? 'taskForm--mainWrapper__active' : ''}`}>
            <input
                type="text"
                placeholder="Podaj tytuł zadania..."
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Podaj opis zadania..."
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <button
                type="button"
                onClick={() => addTask()}
                disabled={disabled}
                className={disabled ? 'taskForm--mainWrapper__buttonDisabled' : ''}
            >
                Dodaj
            </button>
        </div>
    );
}
