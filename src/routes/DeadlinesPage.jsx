import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import DeadlinesList from '../components/DeadlinesList';
import DeadlinePagination from '../components/DeadlinesList/DeadlinePagination';
import ProtectedRoute from '../hoc/ProtectedRoute';
import DeadlinesProvider from '../contexts/DeadlinesContext';

function DeadlinesPage() {
  const deadlinesPagination = <DeadlinePagination />;

  return (
    <Container maxWidth="md">
      <DeadlinesProvider limit={20}>
        <Grid container mt={3} mb={2}>
          <Grid xs={3}></Grid>
          <Grid xs={6}>{deadlinesPagination}</Grid>
          <Grid xs={3}></Grid>
        </Grid>

        <DeadlinesList />

        <Grid container mt={2} mb={3}>
          <Grid xs={3}></Grid>
          <Grid xs={6}>{deadlinesPagination}</Grid>
          <Grid xs={3}></Grid>
        </Grid>
      </DeadlinesProvider>
    </Container>
  );
}

export default ProtectedRoute(DeadlinesPage);
