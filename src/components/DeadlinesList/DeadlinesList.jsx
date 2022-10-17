import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Divider from '@mui/material/Divider';

import { useDeadlines } from '@/contexts/DeadlinesContext';
import DeadlineItem from './DeadlineItem';
import useModalSelect from '@/hooks/useModalSelect';
import DeleteDialog from '../DeleteDialog';
import DeadlineExportDialog from './DeadlineExportDialog';

function DeadlinesList() {
  const { deadlines, isLoading, deleteDeadline, pagination } = useDeadlines();

  const deleteSelect = useModalSelect();
  const exportSelect = useModalSelect();

  if (isLoading) {
    return (
      <Grid container>
        {Array(pagination.limit)
          .fill()
          .map((_, i) => {
            return (
              <Grid xs={6} key={i}>
                <DeadlineItem loading />

                <Divider variant="middle" />
              </Grid>
            );
          })}
      </Grid>
    );
  }

  return (
    <Grid container>
      {deadlines.map(({ id, fromDate, toDate }) => {
        return (
          <Grid xs={6} key={id}>
            <DeadlineItem
              id={id}
              fromDate={fromDate}
              toDate={toDate}
              onDelete={deleteSelect.select}
              onView={exportSelect.select}
            />

            <Divider variant="middle" />
          </Grid>
        );
      })}

      <DeleteDialog
        getTitle={(value) =>
          `Deletar prazo do dia ${value.fromDate.toLocaleDateString(
            'pt-BR'
          )} até ${value.toDate.toLocaleDateString('pt-BR')}`
        }
        getDesc={() => 'Esta ação é irreversível. Deseja continuar?'}
        onConfirm={({ id }) => deleteDeadline(id)}
        {...deleteSelect.registerModal()}
      />
      <DeadlineExportDialog {...exportSelect.registerModal()} />
    </Grid>
  );
}

export default DeadlinesList;
