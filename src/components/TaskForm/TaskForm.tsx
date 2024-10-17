import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
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
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

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
        setButtonDisabled(true);

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
            setButtonDisabled(false);
        });
    };

    return (
        <div className={`taskForm--mainWrapper ${addFormOpen ? 'taskForm--mainWrapper__active' : ''}`}>
            <Toaster />
            <input
                type="text"
                placeholder="Podaj tytuł zadania..."
                maxLength={35}
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Podaj opis zadania..."
                maxLength={100}
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <button
                type="button"
                onClick={() => addTask()}
                disabled={buttonDisabled}
                className={buttonDisabled ? 'taskForm--mainWrapper__buttonDisabled' : ''}
            >
                Dodaj
            </button>
        </div>
    );
}
