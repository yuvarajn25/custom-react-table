import React, { useEffect, useMemo, useState } from 'react';
import {
  useBlockLayout,
  useColumnOrder,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { TableSortLabel } from '@material-ui/core';

import ColumnList from './components/ColumnList';
import Styles from './styles';
import Pagination from './components/Pagination';
import Filters from './components/Filters/Filters';

export interface Props {
  columns: any[];
  data: any[];
  enableSorting: boolean;
  enableColumnResize: boolean;
  enableRowSelect: boolean;
  enabledPagination: boolean;
  totalRecordsCount: number;
  pageSizes: number[];
  useServerData: boolean;
  dataFunction: () => void;
}

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: any, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

export function Table({
  columns: columnData,
  data: rowData,
  enableSorting = true,
  enableColumnResize = false,
  enabledPagination = false,
  enableRowSelect = true,
  totalRecordsCount = 0,
  pageSizes = [10, 20, 30, 40, 50],
  useServerData = false,
  dataFunction = undefined,
}: Props) {
  const data = rowData; // useMemo(() => rowData, []);
  const columns = columnData; //useMemo(() => columnData, []);
  const [pageCount, setPageCount] = useState(
    Math.ceil((useServerData ? totalRecordsCount : data.length) / pageSizes[0])
  );

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    setColumnOrder,
    toggleHideColumn,
    toggleAllRowsSelected,
    state,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      manualPagination: useServerData,
      manualSortBy: useServerData,
      disableSortBy: !enableSorting,
      disableResizing: !enableColumnResize,
      pageCount: enabledPagination ? pageCount : 1,
      initialState: {
        pageSize: enabledPagination ? pageSizes[0] : data.length,
      },
      autoResetPage: false,
    },
    useSortBy,
    useBlockLayout,
    useResizeColumns,
    useColumnOrder,
    usePagination,
    useRowSelect,

    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'selection',
          width: 50,
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }: any) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
          disableSortBy: true,
          disableResizing: true,
          isVisible: false,
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    toggleHideColumn('selection', !enableRowSelect);
    if (!enableRowSelect) {
      toggleAllRowsSelected(false);
    }
  }, [enableRowSelect]);

  useEffect(() => {
    if (!(useServerData && dataFunction)) return;
    const options = { pageIndex, pageSize };
    if (state?.sortBy?.length) {
      options.sortBy = {
        field: state.sortBy[0].id,
        order: state.sortBy[0].desc ? 'desc' : 'asc',
      };
    }
    dataFunction(options);
  }, [dataFunction, pageIndex, pageSize, state.sortBy]);

  useEffect(() => {
    Math.ceil((useServerData ? totalRecordsCount : data.length) / pageSize);
  }, [totalRecordsCount, pageSize]);

  // Render the UI for your table
  return (
    <Styles>
      <div>
        <div className="action-btn-container">
          <ColumnList columns={allColumns} setColumnOrder={setColumnOrder} />
          <Filters columns={allColumns} />
        </div>
        <div {...getTableProps()} className="table">
          <div>
            {headerGroups.map((headerGroup) => (
              <div {...headerGroup.getHeaderGroupProps()} className="thead">
                {headerGroup.headers.map((column: any) => (
                  <div
                    {...column.getHeaderProps(
                      enableSorting ? column.getSortByToggleProps() : {}
                    )}
                    className="th"
                  >
                    {column.render('Header')}
                    {enableSorting && column.canSort && (
                      <TableSortLabel
                        active={column.isSorted}
                        // react-table has a unsorted state which is not treated here
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      />
                    )}
                    {/* Use column.getResizerProps to hook up the events correctly */}
                    {enableColumnResize && column.canResize && (
                      <div
                        {...column.getResizerProps()}
                        className={`resizer ${
                          column.isResizing ? 'isResizing' : ''
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div {...getTableBodyProps()}>
            {(enabledPagination ? page : rows).map((row, i) => {
              prepareRow(row);
              return (
                <div {...row.getRowProps()} className="tr">
                  {row.cells.map((cell) => {
                    return (
                      <div {...cell.getCellProps()} className="td">
                        {cell.render('Cell')}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {enabledPagination && (
          <Pagination
            gotoPage={gotoPage}
            previousPage={previousPage}
            setPageSize={setPageSize}
            nextPage={nextPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageIndex={pageIndex}
            pageSize={pageSize}
            pageCount={pageCount}
            pageSizes={pageSizes}
          />
        )}
      </div>
    </Styles>
  );
}
