'use client';

import React, { useState } from 'react';
import Task, { TaskProps } from '../Task/Task';

export default function MainForm() {
    const [tasks, setTasks] = useState([]);
    const [newTaskName, setNewTaskName] = useState<string>('');
    const [newTaskDescription, setNewTaskDescription] = useState<string>('');

    return (
        <section className="mainForm--mainWrapper">
            <h1 className="mainForm--mainWrapper__heading">To - Do</h1>
            <div className="mainForm--mainWrapper--upperSectionWrapper">
                <div className="mainForm--mainWrapper--buttonsListWrapper">
                    <div className="mainForm--mainWrapper--selectedButtonWrapper">
                        <button type="button">Wszystkie</button>
                        <p>13</p>
                    </div>
                    <div className="mainForm--mainWrapper--buttonsListWrapper__breakLine" />
                    <div className="mainForm--mainWrapper--selectedButtonWrapper">
                        <button type="button">Otwarte</button>
                        <p>7</p>
                    </div>
                    <div className="mainForm--mainWrapper--selectedButtonWrapper">
                        <button type="button">Wykonane</button>
                        <p>6</p>
                    </div>
                </div>
                <button type="button">Dodaj zadanie</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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
                <button type="button">
                    Dodaj
                </button>
            </div>
            <div className="mainForm--mainWrapper--tasksList">
                { }

            </div>
        </section>
    );
}
