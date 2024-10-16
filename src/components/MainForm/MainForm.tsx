'use client';

import React, { useState, useEffect } from 'react';
import UpperSection from '../UpperSection/UpperSection';
import TasksList from '../TasksList/TasksList';
import { TaskProps } from '../Task/Task';
import TaskForm from '../TaskForm/TaskForm';
/* eslint-disable @typescript-eslint/indent */

export default function MainForm() {
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [selectedList, setSelectedList] = useState<0 | 1 | 2>(0);
    const [shownTasks, setShownTasks] = useState<TaskProps[]>([]);
    const [doneCount, setDoneCount] = useState<number>(0);
    const [addFormOpen, setAddFormOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const toggleTaskDone = async (id: string) => {
        const res = await fetch(`/api/update/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: true }),
        });

        const updatedTask = await res.json();
        setTasks((prevTasks) => prevTasks.map((task) => {
            if (task.id === id) {
                return updatedTask;
            }

            return task;
        }));
    };

    const removeTask = async (id: string) => {
        await fetch(`/api/delete/${id}`, {
            method: 'DELETE',
        });

        setTasks(tasks.filter((task) => task.id !== id));
    };

    useEffect(() => {
        const fetchTodos = async () => {
            const res = await fetch('/api/get');
            const data = await res.json();
            setTasks(data);
        };

        fetchTodos();
    }, []);

    useEffect(() => {
        const newDoneCount = tasks.filter((task) => task.isDone).length;
        setDoneCount(newDoneCount);
    }, [tasks]);

    useEffect(() => {
        if (selectedList === 0) {
            setShownTasks(tasks.filter((task) => !task.isDone));
        } else if (selectedList === 1) {
            setShownTasks(tasks.filter((task) => task.isDone));
        } else {
            setShownTasks(tasks);
        }
    }, [selectedList, tasks]);

    return (
        <section className="mainForm--mainWrapper">
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
