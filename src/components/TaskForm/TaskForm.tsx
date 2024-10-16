import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
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

    const postTaskRequest = async (newTask: Partial<TaskProps>) => {
        const response = await fetch('/api/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask),
        });

        if (!response.ok) {
            throw new Error('Failed to add task');
        }

        return response.json();
    };

    const addTask = async () => {
        setDisabled(true);

        const newTask: Partial<TaskProps> = {
            title: newTaskName.trim(),
            description: newTaskDescription.trim(),
            isDone: false,
            markAsDone: () => { },
            removeTask: () => { },
        };

        toast.promise(
            postTaskRequest(newTask),
            {
                loading: 'Dodawanie nowego zadania...',
                success: 'Pomyślnie dodano zadanie!',
                error: 'Wystąpił błąd podczas dodawania zadania! Spróbuj ponownie!',
            },
        ).then((savedTask) => {
            setTasks([...tasks, savedTask]);
            setNewTaskName('');
            setNewTaskDescription('');
            setAddFormOpen(false);
            setDisabled(false);
        });

        setDisabled(false);
    };

    return (
        <div className={`taskForm--mainWrapper ${addFormOpen ? 'taskForm--mainWrapper__active' : ''}`}>
            <Toaster />
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
