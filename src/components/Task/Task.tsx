import React from 'react';
import { FaTrash } from 'react-icons/fa';

export interface TaskProps {
    id: string,
    title: string,
    description: string,
    isDone: boolean,
    markAsDone: () => void
    removeTask: () => void
}

export default function Task({
    id,
    title,
    description,
    isDone,
    markAsDone,
    removeTask,
}: TaskProps) {
    return (
        <div className="task--mainWrapper" key={id}>
            <div>
                <div>
                    <p
                        className={`task--mainWrapper__title
                        ${isDone ? 'task--mainWrapper__title__done' : ''}`}
                    >
                        {title === '' ? 'Brak tytułu' : title}
                    </p>
                    <p className="task--mainWrapper__description">
                        {description === '' ? 'Brak opisu' : description}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={removeTask}
                    className="task--mainWrapper__removeButton"
                >
                    <FaTrash className="task--mainWrapper__removeButton__icon" />
                </button>
            </div>
            <input
                type="checkbox"
                defaultChecked={isDone}
                onClick={markAsDone}
                className="task--mainWrapper__doneButton"
            />
        </div>
    );
}
