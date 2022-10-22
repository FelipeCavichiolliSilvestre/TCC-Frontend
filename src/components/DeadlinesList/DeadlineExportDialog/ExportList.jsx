import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SearchBar from '../../SearchBar';

import { useExport } from '../../../contexts/ExportContext';
import ExportListItem from './ExportListItem';
import ExportListHeader from './ExportListHeader';

function ExportList() {
  const { users, search, isLoading } = useExport();

  if (isLoading) return <>LOADING</>;

  return (
    <List sx={{ minHeight: '100vh' }} scroll="body" dense>
      <ListItem>
        <ListItemText>
          <SearchBar delay={100} onChange={(v) => search(v.toUpperCase())} />
        </ListItemText>
      </ListItem>

      <ExportListHeader />
      <Divider />

      {users.map((user) => {
        return (
          <>
            <ExportListItem user={user} />
            <Divider />
          </>
        );
      })}
    </List>
  );
}

export default ExportList;
