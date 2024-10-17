import React from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { TaskProps } from '../Task/Task';
import CategoryButton from '../CategoryButton/CategoryButton';

interface UpperSectionProps {
    tasks: TaskProps[],
    selectedList: 0 | 1 | 2,
    addFormOpen: boolean,
    doneCount: number,
    setAddFormOpen: (isOpen: boolean) => void
    setSelectedList: (id: 0 | 1 | 2) => void
}

export default function UpperSection({
    tasks,
    selectedList,
    addFormOpen,
    doneCount,
    setSelectedList,
    setAddFormOpen,
}: UpperSectionProps) {
    return (
        <div className="upperSection--mainWrapper--upperSectionWrapper">
            <div className="upperSection--mainWrapper--buttonsListWrapper">
                <CategoryButton
                    buttonListId={0}
                    selectedList={selectedList}
                    shownText="Wszystkie"
                    shownAmount={tasks.length}
                    setSelectedList={setSelectedList}
                />
                <CategoryButton
                    buttonListId={1}
                    selectedList={selectedList}
                    shownText="Do zrobienia"
                    shownAmount={tasks.length - doneCount}
                    setSelectedList={setSelectedList}
                />
                <div className="upperSection--mainWrapper--buttonsListWrapper__breakLine" />
                <CategoryButton
                    buttonListId={2}
                    selectedList={selectedList}
                    shownText="Wykonane"
                    shownAmount={doneCount}
                    setSelectedList={setSelectedList}
                />
            </div>
            <button
                type="button"
                className={`upperSection--mainWrapper__addTaskButton
                ${addFormOpen ? 'upperSection--mainWrapper__addTaskButton__active' : ''}`}
                onClick={() => setAddFormOpen(!addFormOpen)}
            >
                {addFormOpen
                    ? <FiMinus className="upperSection--mainWrapper__addTaskButton__icon" />
                    : <FiPlus className="upperSection--mainWrapper__addTaskButton__icon" />}
                <p>{addFormOpen ? 'Zamknij formularz' : 'Dodaj zadanie'}</p>
            </button>
        </div>
    );
}
