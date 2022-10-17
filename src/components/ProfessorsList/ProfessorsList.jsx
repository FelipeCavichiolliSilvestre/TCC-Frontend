import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Divider from '@mui/material/Divider';
import ProfessorItem from './ProfessorItem';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import useProfessors from '@/hooks/useProfessors';
import useModalSelect from '@/hooks/useModalSelect';
import DeleteDialog from '../DeleteDialog';

function ProfessorList({ page, limit, term }) {
  const { isLoading, professors, search, deleteProfessor } = useProfessors({
    page,
    limit,
  });
  const { isAdmin } = useAuth();
  const deleteSelect = useModalSelect();

  useEffect(() => {
    search(term);
  }, [term]);

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
            />

            <Divider variant="middle" />
          </Grid>
        );
      })}

      <DeleteDialog
        onConfirm={({ id }) => deleteProfessor(id)}
        {...deleteSelect.registerModal()}
      />
    </Grid>
  );
}

export default ProfessorList;
