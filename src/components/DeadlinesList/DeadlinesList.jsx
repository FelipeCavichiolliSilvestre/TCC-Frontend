import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Divider from '@mui/material/Divider';

import { useDeadlines } from '../../contexts/DeadlinesContext';
import DeadlineItem from './DeadlineItem';
import useModalSelect from '../../hooks/useModalSelect';
import DeadlineExportDialog from './DeadlineExportDialog/DeadlineExportDialog';
import DeadlineEditDialog from './DeadlineEditDialog';
import DeadlineDeleteDialog from './DeadlineDeleteDialog';

function DeadlinesList() {
  const { deadlines, isLoading, pagination } = useDeadlines();

  const deleteSelect = useModalSelect();
  const exportSelect = useModalSelect();
  const editSelect = useModalSelect();

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
              onEdit={editSelect.select}
            />

            <Divider variant="middle" />
          </Grid>
        );
      })}

      <DeadlineDeleteDialog {...deleteSelect.registerModal()} />
      <DeadlineExportDialog {...exportSelect.registerModal()} />
      <DeadlineEditDialog {...editSelect.registerModal()} />
    </Grid>
  );
}

export default DeadlinesList;
