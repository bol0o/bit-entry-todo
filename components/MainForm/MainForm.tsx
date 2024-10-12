'use client';

import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';

import Task, { TaskProps } from '../Task/Task';

export default function MainForm() {
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [selectedList, setSelectedList] = useState<number>(0);
    const [shownTasks, setShownTasks] = useState<TaskProps[]>([]);
    const [newTaskName, setNewTaskName] = useState<string>('');
    const [newTaskDescription, setNewTaskDescription] = useState<string>('');
    const [doneCount, setDoneCount] = useState<number>(0);

    const toggleTaskDone = (id: number) => {
        setTasks((prevTasks) => prevTasks.map((task) => {
            if (task.id === id) {
                return { ...task, isDone: !task.isDone };
            }

            return task;
        }));
    };

    const addTask = () => {
        const taskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0;
        const newTask: TaskProps = {
            id: taskId,
            title: newTaskName,
            description: newTaskDescription,
            isDone: false,
            markAsDone: () => { },
        };

        setTasks([...tasks, newTask]);
        setNewTaskName('');
        setNewTaskDescription('');
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
            <div className="mainForm--mainWrapper--upperSectionWrapper">
                <div className="mainForm--mainWrapper--buttonsListWrapper">
                    <div className="mainForm--mainWrapper--selectedButtonWrapper">
                        <button
                            type="button"
                            onClick={() => setSelectedList(0)}
                            className={selectedList === 0 ? 'mainForm--mainWrapper--selectedButtonWrapper__active' : ''}
                        >
                            <p className="mainForm--mainWrapper--selectedButtonWrapper__selectedType">Wszystkie</p>
                            <p
                                className={`mainForm--mainWrapper--selectedButtonWrapper__count
                                ${selectedList === 0 ? 'mainForm--mainWrapper--selectedButtonWrapper__count__active' : ''}`}
                            >
                                {tasks.length}
                            </p>
                        </button>
                    </div>
                    <div className="mainForm--mainWrapper--buttonsListWrapper__breakLine" />
                    <div className="mainForm--mainWrapper--selectedButtonWrapper">
                        <button
                            type="button"
                            onClick={() => setSelectedList(1)}
                            className={selectedList === 1 ? 'mainForm--mainWrapper--selectedButtonWrapper__active' : ''}
                        >
                            <p className="mainForm--mainWrapper--selectedButtonWrapper__selectedType">Do zrobienia</p>
                            <p
                                className={`mainForm--mainWrapper--selectedButtonWrapper__count
                                ${selectedList === 1 ? 'mainForm--mainWrapper--selectedButtonWrapper__count__active' : ''}`}
                            >
                                {tasks.length - doneCount}
                            </p>
                        </button>
                    </div>
                    <div className="mainForm--mainWrapper--selectedButtonWrapper">
                        <button
                            type="button"
                            onClick={() => setSelectedList(2)}
                            className={selectedList === 2 ? 'mainForm--mainWrapper--selectedButtonWrapper__active' : ''}
                        >
                            <p className="mainForm--mainWrapper--selectedButtonWrapper__selectedType">Wykonane</p>
                            <p
                                className={`mainForm--mainWrapper--selectedButtonWrapper__count
                                ${selectedList === 2 ? 'mainForm--mainWrapper--selectedButtonWrapper__count__active' : ''}`}
                            >
                                {doneCount}
                            </p>
                        </button>
                    </div>
                </div>
                <button type="button" className="mainForm--mainWrapper__addTaskButton">
                    <FiPlus style={{ width: 20, height: 20 }} />
                    <p>Dodaj zadanie</p>
                </button>
            </div>
            <div className="mainForm--mainWrapper--taskFormWrapper">
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
                >
                    Dodaj
                </button>
            </div>
            <div className="mainForm--mainWrapper--tasksList">
                {shownTasks.map((task: TaskProps) => (
                    <Task
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        isDone={task.isDone}
                        markAsDone={() => toggleTaskDone(task.id)}
                    />
                ))}
                {tasks.length > 0 ? null
                    : (
                        <div style={{ alignSelf: 'center', textAlign: 'center' }}>
                            <p>Narazie nic tu nie ma!</p>
                            <p>Kliknij przycisk <strong>Dodaj zadanie</strong> aby dodać swoje pierwsze zadanie!</p>
                        </div>
                    )
                }
            </div>
        </section>
    );
}
