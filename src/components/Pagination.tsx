import React from 'react';

export interface PaginationProps {
  gotoPage: (page: number) => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  pageSizes: number[];
}

export default function Pagination({
  gotoPage,
  previousPage,
  nextPage,
  setPageSize,
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageSize,
  pageCount,
  pageSizes,
}: PaginationProps) {
  return (
    <div className="pagination">
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {'<<'}
      </button>{' '}
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {'<'}
      </button>{' '}
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        {'>'}
      </button>{' '}
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {'>>'}
      </button>{' '}
      <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of ~{pageCount}
        </strong>{' '}
      </span>
      <span>
        | Go to page:{' '}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          style={{ width: '100px' }}
        />
      </span>{' '}
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {pageSizes.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}
