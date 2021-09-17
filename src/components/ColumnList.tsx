import React, { useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useComponentVisible from '../hooks/useComponentVisible';
import ColumnItem from './ColumnItem';

export default function ColumnList({ columns = [], setColumnOrder }: any) {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);

  const columnIds = columns.map((c: any) => c.id);
  const moveColumn = useCallback(
    (dragIndex, hoverIndex) => {
      console.log({ dragIndex, hoverIndex });
      [columnIds[dragIndex], columnIds[hoverIndex]] = [
        columnIds[hoverIndex],
        columnIds[dragIndex],
      ];
      setColumnOrder(columnIds);
    },
    [columns]
  );
  return (
    <div ref={ref} className="action-btn">
      <button onClick={() => setIsComponentVisible(!isComponentVisible)}>
        Columns
      </button>
      <DndProvider backend={HTML5Backend}>
        <div className={`columns-list ${isComponentVisible ? 'showList' : ''}`}>
          {columns
            .filter((c: any) => c.id !== 'selection')
            .map((column: any, index: number) => (
              <ColumnItem
                id={column.id}
                index={index}
                moveColumn={moveColumn}
                column={column}
              />
            ))}
        </div>
      </DndProvider>
    </div>
  );
}
