import React from 'react';

const condtions = [
  {
    value: 'eq',
    display: 'Equals',
  },
  {
    value: 'ne',
    display: 'Not equals',
  },
];
export default function FilterItem({
  columns,
  itemIndex,
  filterItem,
  setFilter,
}: any) {
  return (
    <div>
      <select
        name="columnId"
        value={filterItem.columnId}
        onChange={(e) => setFilter(itemIndex, 'columnId', e.target.value)}
      >
        {columns.map((c: any) => (
          <option value={c.id}>{c.Header}</option>
        ))}
      </select>
      <select
        name="operator"
        value={filterItem.operator}
        onChange={(e) => setFilter(itemIndex, 'operator', e.target.value)}
      >
        {condtions.map((c: any) => (
          <option value={c.value}>{c.display}</option>
        ))}
      </select>
      <input
        type="text"
        value={filterItem.value}
        onChange={(e) => setFilter(itemIndex, 'value', e.target.value)}
      />
    </div>
  );
}
