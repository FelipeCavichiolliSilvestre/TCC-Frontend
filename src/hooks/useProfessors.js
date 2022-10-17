import { useSnackbar } from 'notistack';
import { useState } from 'react';
import useSWR from 'swr';
import api from '../api';
import ApiError from '../api/ApiError';

function useProfessors({ page, limit }) {
  const [searchTerm, setSearchTerm] = useState('');
  const isSearching = searchTerm !== '';

  const {
    data: usersData,
    error: usersError,
    mutate: mutateUsers,
  } = useSWR(() => (!isSearching ? { role: 'PROFESSOR', page, limit } : null), {
    fetcher: api.users.getMany,
  });

  const {
    data: searchData,
    error: searchError,
    mutate: mutateSearch,
  } = useSWR(() => (isSearching ? { term: searchTerm } : null), {
    fetcher: api.users.search,
  });

  const { enqueueSnackbar } = useSnackbar();

  async function deleteProfessor(id) {
    function applyMutation(professors) {
      return professors.filter((professor) => professor.id !== id);
    }

    async function swrDelete(professors) {
      await api.users.delete(id);

      return applyMutation(professors);
    }

    if (isSearching)
      mutateSearch(swrDelete, {
        revalidate: false,
        rollbackOnError: true,
        optimisticData: applyMutation(searchData),
      }).catch(handleDeleteError);
    else
      mutateUsers(swrDelete, {
        revalidate: false,
        rollbackOnError: true,
        optimisticData: applyMutation(usersData),
      }).catch(handleDeleteError);
  }

  function handleDeleteError(error) {
    if (!(error instanceof ApiError)) throw error;

    enqueueSnackbar({
      message: 'Não foi possível deletar professor.',
      helper: error.message,
    });
  }

  const data = isSearching ? searchData : usersData;
  const error = isSearching ? searchError : usersError;

  return {
    professors: data,
    isLoading: !error && !data,
    error,
    search: setSearchTerm,
    deleteProfessor,
  };
}

export default useProfessors;
