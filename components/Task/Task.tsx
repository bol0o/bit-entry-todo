import React from 'react';
import { FaTrash } from "react-icons/fa";

export interface TaskProps {
    id: number,
    title: string,
    description: string,
    isDone: boolean,
    markAsDone: () => void
}

export default function Task({
    id,
    title,
    description,
    isDone,
    markAsDone,
}: TaskProps) {
    return (
        <div className="task--mainWrapper">
            <div>
                <div>
                    <p
                        className={`task--mainWrapper__title
                        ${isDone ? 'task--mainWrapper__title__done' : ''}`}
                    >
                        {title}
                    </p>
                    <p className="task--mainWrapper__description">{description}</p>
                </div>
                <button type="button">
                    <FaTrash style={{ width: 20, height: 20, color: '#FF7477' }} />
                </button>
            </div>
            <input type="checkbox" checked={isDone} onClick={markAsDone} />
        </div>
    );
}
