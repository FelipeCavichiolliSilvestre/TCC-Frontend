import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

import { useExport } from '../../../contexts/ExportContext';

function ExportListHeader() {
  const {
    isFullySelected,
    isPartiallySelected,
    selectedCounter,
    totalCount,
    toggleAll,
  } = useExport();

  return (
    <ListItem dense={false}>
      <ListItemAvatar>
        <Checkbox
          onClick={toggleAll}
          indeterminate={isPartiallySelected}
          checked={isFullySelected}
        />
      </ListItemAvatar>
      <ListItemSecondaryAction>
        <Typography>
          {selectedCounter} / {totalCount}
        </Typography>
      </ListItemSecondaryAction>
      <ListItemText
        primary="Selecionar todos"
        primaryTypographyProps={{ fontSize: 18 }}
      />
    </ListItem>
  );
}

export default ExportListHeader;
