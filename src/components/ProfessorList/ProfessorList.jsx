import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useAuth } from '@/contexts/AuthContext';
import Divider from '@mui/material/Divider';

import { useEffect } from 'react';
import { useProfessors } from '@/hooks/useProfessors';
import ProfessorListItem from './ProfessorListItem';

function ProfessorList({ page, limit, term }) {
  const { isLoading, professors, search } = useProfessors({ page, limit });
  const { isAdmin } = useAuth();

  useEffect(() => {
    search(term);
  }, [term]);

  if (isLoading) {
    return (
      <Grid container>
        {Array(limit)
          .fill()
          .map((v, i) => (
            <Grid xs={isAdmin ? 12 : 6} key={i}>
              <ProfessorListItem loading />

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
            <ProfessorListItem id={id} name={name} email={email} />

            <Divider variant="middle" />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ProfessorList;
