'use client';

import React, { useState, useEffect } from 'react';
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

    const toggleTaskDone = (id: number) => {
        setTasks((prevTasks) => prevTasks.map((task) => {
            if (task.id === id) {
                return { ...task, isDone: !task.isDone };
            }

            return task;
        }));
    };

    const removeTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

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
            />
            <TasksList
                tasks={tasks}
                shownTasks={shownTasks}
                toggleTaskDone={toggleTaskDone}
                removeTask={removeTask}
            />
        </section>
    );
}
