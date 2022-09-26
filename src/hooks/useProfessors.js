import { useState } from 'react';
import useSWR from 'swr';

export function useProfessors({ page, limit }) {
  const [searchTerm, setSearchTerm] = useState('');
  const isSearching = searchTerm !== '';

  const { data: usersData, error: usersError } = useSWR(() =>
    !isSearching ? ['/users', { role: 'PROFESSOR', page, limit }] : null
  );

  const { data: searchData, error: searchError } = useSWR(() =>
    isSearching ? ['/users/search ', { term: searchTerm }] : null
  );

  function search(term) {
    setSearchTerm(term);
  }

  const data = isSearching ? searchData : usersData;
  const error = isSearching ? searchError : usersError;

  return {
    professors: data,
    isLoading: !error && !data,
    error,
    search,
  };
}
