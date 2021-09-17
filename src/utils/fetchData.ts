export const fetchData = (
  page: number,
  limit: number,
  sortBy: { field: string; order: string } = { field: 'id', order: 'desc' }
) => {
  console.log(`fetchData`, { page, limit });
  return fetch(
    `http://localhost:3000/users?_page=${page}&_limit=${limit}&_sort=${sortBy.field}&_order=${sortBy.order}`
  ).then((d) => d.json());
};
