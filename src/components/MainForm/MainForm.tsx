'use client';

import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import UpperSection from '../UpperSection/UpperSection';
import TasksList from '../TasksList/TasksList';
import { TaskProps } from '../Task/Task';
import TaskForm from '../TaskForm/TaskForm';

export default function MainForm() {
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [selectedList, setSelectedList] = useState<0 | 1 | 2>(0);
    const [shownTasks, setShownTasks] = useState<TaskProps[]>([]);
    const [doneCount, setDoneCount] = useState<number>(0);
    const [addFormOpen, setAddFormOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchTasksRequest = async () => {
        const response = await fetch('/api/get', {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }

        return response.json();
    };

    const markCompleteRequest = async (id: string) => {
        const response = await fetch(`/api/update/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isDone: true }),
        });

        if (!response.ok) {
            throw new Error('Failed to update task');
        }

        return response.json();
    };

    const deleteTaskRequest = async (id: string) => {
        const response = await fetch(`/api/delete/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
    };

    const toggleTaskDone = async (id: string) => {
        toast.promise(
            markCompleteRequest(id),
            {
                loading: 'Zmienianie stanu zadania...',
                success: 'Zmieniono stan zadania!',
                error: 'Wystąpił problem podczas zmieniania stanu zadania! Spróbuj ponownie!',
            },
        ).then(() => {
            setTasks((prevTasks) => prevTasks.map((task) => {
                if (task.id === id) {
                    return { ...task, isDone: !task.isDone };
                }

                return task;
            }));
        });
    };

    const removeTask = async (id: string) => {
        toast.promise(
            deleteTaskRequest(id),
            {
                loading: 'Usuwanie zadania...',
                success: 'Usunięto zadanie!',
                error: 'Wystąpił błąd podczas usuwania zadania! Spróbuj ponownie!',
            },
        ).then(() => {
            setTasks(tasks.filter((task) => task.id !== id));
        });
    };

    useEffect(() => {
        toast.promise(
            fetchTasksRequest(),
            {
                loading: 'Pobieranie zadań...',
                success: 'Zadania pobrane!',
                error: 'Wystąpił błąd podczas pobierania zadań! Spróbuj ponownie!',
            },
        ).then((fetchedTasks) => {
            setTasks(fetchedTasks);
        });
    }, []);

    useEffect(() => {
        const newDoneCount = tasks.filter((task) => task.isDone).length;
        setDoneCount(newDoneCount);
    }, [tasks]);

    useEffect(() => {
        if (selectedList === 1) {
            setShownTasks(tasks.filter((task) => !task.isDone));
        } else if (selectedList === 2) {
            setShownTasks(tasks.filter((task) => task.isDone));
        } else {
            setShownTasks(tasks);
        }
    }, [selectedList, tasks]);

    return (
        <section className="mainForm--mainWrapper">
            <Toaster />
            <h1 className="mainForm--mainWrapper__heading">To-Do</h1>
            <UpperSection
                tasks={tasks}
                selectedList={selectedList}
                addFormOpen={addFormOpen}
                doneCount={doneCount}
                setAddFormOpen={setAddFormOpen}
                setSelectedList={setSelectedList}
            />
            <TaskForm
                addFormOpen={addFormOpen}
                tasks={tasks}
                setTasks={setTasks}
                setAddFormOpen={setAddFormOpen}
                disabled={loading}
                setDisabled={setLoading}
            />
            <TasksList
                shownTasks={shownTasks}
                toggleTaskDone={toggleTaskDone}
                removeTask={removeTask}
            />
        </section>
    );
}
