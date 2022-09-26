import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAuth } from '@/contexts/AuthContext';

function ProfessorListItem({
  id,
  name,
  email,
  onDelete,
  onEdit,
  onView,
  loading,
}) {
  const { isAdmin } = useAuth();

  const adminButtons = (
    <>
      <IconButton onClick={() => onDelete({ id, name, email })}>
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={() => onEdit({ id, name, email })}>
        <EditIcon />
      </IconButton>
    </>
  );

  const actionButtons = (
    <>
      {isAdmin && adminButtons}
      <IconButton onClick={() => onView({ id, name, email })}>
        <AccessTimeIcon />
      </IconButton>
    </>
  );

  if (loading) {
    return (
      <ListItem secondaryAction={actionButtons}>
        <ListItemText
          primary={<Skeleton sx={{ maxWidth: '70%' }}></Skeleton>}
          primaryTypographyProps={{
            fontSize: 20,
            color: 'text.primary',
          }}
          secondary={<Skeleton sx={{ maxWidth: '60%' }}></Skeleton>}
          secondaryTypographyProps={{
            fontSize: 15,
            color: 'text.secondary',
            variant: 'body2',
          }}
        />
      </ListItem>
    );
  }

  return (
    <ListItem secondaryAction={actionButtons}>
      <ListItemText
        primary={name}
        primaryTypographyProps={{
          fontSize: 20,
          color: 'text.primary',
        }}
        secondary={email}
        secondaryTypographyProps={{
          fontSize: 15,
          color: 'text.secondary',
          variant: 'body2',
        }}
      />
    </ListItem>
  );
}

export default ProfessorListItem;
