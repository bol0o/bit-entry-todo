import React from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { TaskProps } from '../Task/Task';

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
                <div className="upperSection--mainWrapper--selectedButtonWrapper">
                    <button
                        type="button"
                        onClick={() => setSelectedList(0)}
                    >
                        <p
                            className={`upperSection--mainWrapper--selectedButtonWrapper__selectedType
                            ${selectedList === 0 ? 'upperSection--mainWrapper--selectedButtonWrapper__selectedType__active' : ''}`}
                        >
                            Wszystkie
                        </p>
                        <p
                            className={`upperSection--mainWrapper--selectedButtonWrapper__count
                            ${selectedList === 0 ? 'upperSection--mainWrapper--selectedButtonWrapper__count__active' : ''}`}
                        >
                            {tasks.length}
                        </p>
                    </button>
                </div>
                <div className="upperSection--mainWrapper--buttonsListWrapper__breakLine" />
                <div className="upperSection--mainWrapper--selectedButtonWrapper">
                    <button
                        type="button"
                        onClick={() => setSelectedList(1)}
                    >
                        <p
                            className={`upperSection--mainWrapper--selectedButtonWrapper__selectedType
                            ${selectedList === 1 ? 'upperSection--mainWrapper--selectedButtonWrapper__selectedType__active' : ''}`}
                        >
                            Do zrobienia
                        </p>
                        <p
                            className={`upperSection--mainWrapper--selectedButtonWrapper__count
                            ${selectedList === 1 ? 'upperSection--mainWrapper--selectedButtonWrapper__count__active' : ''}`}
                        >
                            {tasks.length - doneCount}
                        </p>
                    </button>
                </div>
                <div className="upperSection--mainWrapper--selectedButtonWrapper">
                    <button
                        type="button"
                        onClick={() => setSelectedList(2)}
                        className={selectedList === 2 ? 'upperSection--mainWrapper--selectedButtonWrapper__active' : ''}
                    >
                        <p
                            className={`upperSection--mainWrapper--selectedButtonWrapper__selectedType
                            ${selectedList === 2 ? 'upperSection--mainWrapper--selectedButtonWrapper__selectedType__active' : ''}`}
                        >
                            Wykonane
                        </p>
                        <p
                            className={`upperSection--mainWrapper--selectedButtonWrapper__count
                            ${selectedList === 2 ? 'upperSection--mainWrapper--selectedButtonWrapper__count__active' : ''}`}
                        >
                            {doneCount}
                        </p>
                    </button>
                </div>
            </div>
            <button
                type="button"
                className={`upperSection--mainWrapper__addTaskButton
                ${addFormOpen ? 'upperSection--mainWrapper__addTaskButton__active' : ''}`}
                onClick={() => setAddFormOpen(!addFormOpen)}
            >
                {addFormOpen
                    ? <FiMinus style={{ width: 20, height: 20 }} />
                    : <FiPlus style={{ width: 20, height: 20 }} />}
                <p>{addFormOpen ? 'Zamknij formularz' : 'Dodaj zadanie'}</p>
            </button>
        </div>
    );
}
