import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';

import { useExport } from '../../../contexts/ExportContext';

function ExportListItem({ user }) {
  const { makeUserSelect } = useExport();

  return (
    <ListItemButton onClick={makeUserSelect(user)}>
      <ListItemAvatar>
        <Checkbox readOnly checked={user.selected} />
      </ListItemAvatar>

      <ListItemText
        primary={user.name}
        primaryTypographyProps={{ fontSize: 17 }}
      />
    </ListItemButton>
  );
}

export default ExportListItem;
