import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Divider from '@mui/material/Divider';
import ProfessorItem from './ProfessorItem';

import { useAuth } from '../../contexts/AuthContext';
import { useProfessors } from '../../contexts/ProfessorsContext';
import useModalSelect from '../../hooks/useModalSelect';
import ProfessorEditDialog from './ProfessorEditDialog';
import ProfessorDeleteDialog from './ProfessorDeleteDialog';

function ProfessorList() {
  const {
    isLoading,
    professors,
    pagination: { limit },
  } = useProfessors();
  const { isAdmin } = useAuth();

  const deleteSelect = useModalSelect();
  const editSelect = useModalSelect();
  const viewSelect = useModalSelect();

  if (isLoading) {
    return (
      <Grid container>
        {Array(limit)
          .fill()
          .map((_, i) => (
            <Grid xs={isAdmin ? 12 : 6} key={i}>
              <ProfessorItem loading />

              <Divider variant="middle" />
            </Grid>
          ))}
      </Grid>
    );
  }

  return (
    <Grid container>
      {professors.map(({ id, name, email }) => {
        return (
          <Grid xs={isAdmin ? 12 : 6} key={id}>
            <ProfessorItem
              id={id}
              name={name}
              email={email}
              onDelete={deleteSelect.select}
              onEdit={editSelect.select}
              onView={viewSelect.select}
            />

            <Divider variant="middle" />
          </Grid>
        );
      })}

      <ProfessorDeleteDialog {...deleteSelect.registerModal()} />
      <ProfessorEditDialog {...editSelect.registerModal()} />
    </Grid>
  );
}

export default ProfessorList;
