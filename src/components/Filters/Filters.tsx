import React, { useCallback, useState } from 'react';
import useComponentVisible from '../../hooks/useComponentVisible';
import FilterItem from './FilterItems';

export default function Filters({ columns }: any) {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);

  const [filters, setFilters] = useState([
    { columnId: '', operator: '', value: '' },
  ]);

  const setFitler = useCallback((index, field, value) => {
    console.log({ index, field, value });
    filters[index][field] = value;
    setFilters([...filters]);
  }, []);

  return (
    <div ref={ref} className="action-btn">
      <button onClick={() => setIsComponentVisible(!isComponentVisible)}>
        Filters
      </button>
      <div
        className={`filters-list ${
          isComponentVisible ? 'showList' : 'showList'
        }`}
      >
        {filters.map((filter: any, index: number) => (
          <FilterItem
            filterItem={filter}
            columns={columns}
            itemIndex={index}
            key={index}
            setFilter={setFitler}
          />
        ))}
      </div>
    </div>
  );
}
