import React from 'react';
import Task, { TaskProps } from '../Task/Task';

interface TasksListProps {
    tasks: TaskProps[],
    shownTasks: TaskProps[],
    toggleTaskDone: (id: number) => void,
    removeTask: (id: number) => void
}

export default function TasksList({
    tasks,
    shownTasks,
    toggleTaskDone,
    removeTask,
}: TasksListProps) {
    return (
        <div className="tasksList--mainWrapper">
            {shownTasks.map((task: TaskProps) => (
                <Task
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    isDone={task.isDone}
                    markAsDone={() => toggleTaskDone(task.id)}
                    removeTask={() => removeTask(task.id)}
                />
            ))}
            {tasks.length > 0 ? null
                : (
                    <div style={{ alignSelf: 'center', textAlign: 'center' }}>
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
