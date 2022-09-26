import { useState } from 'react';

export function usePagination({ defaultLimit, defaultPage }) {
  const [page, setPage] = useState(defaultPage ?? 0);
  const [limit, setLimit] = useState(defaultLimit ?? 10);

  function nextPage() {
    setPage((value) => value + 1);
  }

  function prevPage() {
    setPage((value) => value - 1);
  }

  function jumpToPage(value) {
    setPage(value);
  }

  return {
    page,
    userPage: page + 1,
    limit,
    nextPage,
    prevPage,
    setLimit,
    jumpToPage,
  };
}
