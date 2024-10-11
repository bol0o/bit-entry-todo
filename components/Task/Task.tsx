import React from 'react';

export interface TaskProps {
    title: string,
    description: string,
}

export default function Task({ title, description }: TaskProps) {
    return (
        <div className="task--mainWrapper">
            <div>
                <div>
                    <p>{title}</p>
                    <p>{description}</p>
                </div>
                <button type="button">Usuń</button>
            </div>
            <input type="checkbox" />
        </div>
    );
}
