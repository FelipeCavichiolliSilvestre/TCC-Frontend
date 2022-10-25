import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Skeleton from '@mui/material/Skeleton';

import { useExport } from '../../../contexts/ExportContext';

function ExportListItem({ user }) {
  const { makeUserSelect } = useExport();
  const loading = user === null;

  if (loading)
    return (
      <ListItemButton>
        <ListItemAvatar>
          <Checkbox disabled />
        </ListItemAvatar>

        <ListItemText
          primary={<Skeleton />}
          primaryTypographyProps={{ fontSize: 17 }}
        ></ListItemText>
      </ListItemButton>
    );

  return (
    <ListItemButton onClick={makeUserSelect(user)}>
      <ListItemAvatar>
        <Checkbox checked={user.selected} />
      </ListItemAvatar>

      <ListItemText
        primary={user.name}
        primaryTypographyProps={{ fontSize: 17 }}
      />
    </ListItemButton>
  );
}

export default ExportListItem;
