import React from 'react';
import Task, { TaskProps } from '../Task/Task';

interface TasksListProps {
    shownTasks: TaskProps[],
    toggleTaskDone: (id: string) => void,
    removeTask: (id: string) => void
}

export default function TasksList({
    shownTasks,
    toggleTaskDone,
    removeTask,
}: TasksListProps) {
    return (
        <div className="tasksList--mainWrapper">
            {shownTasks.map((task: TaskProps) => (
                <Task
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    isDone={task.isDone}
                    markAsDone={() => toggleTaskDone(task.id)}
                    removeTask={() => removeTask(task.id)}
                />
            ))}
            {shownTasks.length > 0 ? null
                : (
                    <div className="tasksList--mainWrapper__note">
                        <p>Narazie nic tu nie ma!</p>
                        <p>
                            Kliknij przycisk
                            <strong> &apos;Dodaj zadanie&apos; </strong>
                            aby dodać swoje pierwsze zadanie!
                        </p>
                    </div>
                )}
        </div>
    );
}
