import React from 'react';

interface CategoryButtonProps {
    buttonListId: 0 | 1 | 2,
    selectedList: 0 | 1 | 2,
    shownText: string,
    shownAmount: number,
    setSelectedList: (id: 0 | 1 | 2) => void
}

export default function CategoryButton({
    buttonListId,
    selectedList,
    shownText,
    shownAmount,
    setSelectedList,
}: CategoryButtonProps) {
    return (
        <div className="categoryButon--mainWrapper">
            <button
                type="button"
                onClick={() => setSelectedList(buttonListId)}
            >
                <p
                    className={`categoryButton--mainWrapper__selectedType
                    ${selectedList === buttonListId ? 'categoryButton--mainWrapper__selectedType__active' : ''}`}
                >
                    {shownText}
                </p>
                <p
                    className={`categoryButton--mainWrapper__count
                    ${selectedList === buttonListId ? 'categoryButton--mainWrapper__count__active' : ''}`}
                >
                    {shownAmount}
                </p>
            </button>
        </div>
    );
}
