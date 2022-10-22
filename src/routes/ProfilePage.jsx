import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import ProtectedRoute from '../hoc/ProtectedRoute';

function ProfilePage() {
  const weeks = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  const hours = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <Container maxWidth="md">
      <Grid container columns={6}>
        <Grid
          xs={1}
          sx={{
            border: '1px gray solid',
          }}
        ></Grid>
        {weeks.map((title) => (
          <Grid
            key="title"
            xs={1}
            sx={{
              border: '1px gray solid',
              borderLeft: 'none',
            }}
          >
            <Typography textAlign="center" variant="h5">
              {title}
            </Typography>
          </Grid>
        ))}
        {hours.map((hour) => (
          <>
            <Grid
              key={hour}
              xs={1}
              sx={{
                border: '1px gray solid',
                borderTop: 'none',
              }}
            >
              <Typography textAlign="center" variant="h5">
                {hour}
              </Typography>
            </Grid>
            {weeks.map((v, i) => (
              <Grid
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  borderRight: '1px gray solid',
                  borderBottom: '1px gray solid',
                }}
                key={i}
                xs={1}
              >
                <Checkbox sx={{ width: '100%', aspectRatio: 1 }} />
              </Grid>
            ))}
          </>
        ))}
      </Grid>
    </Container>
  );
}

export default ProtectedRoute(ProfilePage);
