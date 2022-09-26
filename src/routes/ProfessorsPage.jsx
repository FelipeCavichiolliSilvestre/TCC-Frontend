import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Container from '@mui/material/Container';
import ProfessorList from '@/components/ProfessorList';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/Searchbar';

import { useState } from 'react';
import { usePagination } from '@/hooks/usePagination';

import ProtectedRoute from '../hoc/ProtectedRoute';

function ProfessorsPage() {
  const pagination = usePagination({ defaultLimit: 20 });
  const [term, setTerm] = useState('');

  const professorPagination = (
    <Pagination
      currentPage={pagination.userPage}
      onNext={pagination.nextPage}
      onPrev={pagination.prevPage}
      disable={term !== ''}
      disableLeft={pagination.page === 0}
    />
  );

  return (
    <Container maxWidth="md">
      <Grid container columnSpacing={4} mt={3} mb={2}>
        <Grid xs={6}>{professorPagination}</Grid>

        <Grid xs={6} pr={4}>
          <SearchBar onChange={setTerm} />
        </Grid>
      </Grid>

      <ProfessorList
        limit={pagination.limit}
        page={pagination.page}
        term={term}
      />

      <Grid container columnSpacing={4} mt={3} mb={2}>
        <Grid xs={6}>{professorPagination}</Grid>
      </Grid>
    </Container>
  );
}

export default ProtectedRoute(ProfessorsPage);
