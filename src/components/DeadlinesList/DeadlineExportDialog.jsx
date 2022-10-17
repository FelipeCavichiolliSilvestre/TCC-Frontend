import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Divider from '@mui/material/Divider';
import SearchBar from '../SearchBar';
import Typography from '@mui/material/Typography';

import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import api from '@/api';
import useSWR from 'swr';
import { useArray } from 'react-hanger';
import { useEffect, useState } from 'react';

function DeadlineExportDialog({ open, onClose, value: deadline }) {
  const { data, error } = useSWR(
    () => (deadline ? deadline.id : null),
    api.deadlines.getOne,
    {
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateIfStale: false,
    }
  );
  const [value, setValue] = useState('');
  const users = useArray([]);

  useEffect(() => {
    if (!data) return;

    users.setValue(
      data.users.map((user) => ({
        ...user,
        selected: false,
      }))
    );
  }, [data]);

  const selectedCounter = users.value.reduce(
    (counter, user) => (user.selected ? counter + 1 : counter),
    0
  );

  const isPartiallySelected =
    selectedCounter > 0 && selectedCounter < users.value.length;
  const isFullySelected = selectedCounter == users.value.length;

  async function download() {
    await api.schedules.getXmlSchedule({
      startDate: deadline.fromDate,
      endDate: deadline.toDate,
      userIds: users.value
        .filter((u) => u.selected === true)
        .map((u) => u.id)
        .join(','),
    });
  }

  if (!data) return <></>;
  if (error) return <></>;

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Exportar disponibilidades</DialogTitle>
      <DialogContent>
        <List sx={{ minHeight: '100vh' }} scroll="body" dense>
          <ListItem>
            <ListItemText>
              <SearchBar
                delay={100}
                onChange={(v) => setValue(v.toUpperCase())}
              />
            </ListItemText>
          </ListItem>

          <ListItem dense={false}>
            <ListItemAvatar>
              <Checkbox
                onClick={() => {
                  users.setValue(
                    users.value.map((user) => ({
                      ...user,
                      selected: isPartiallySelected ? true : !isFullySelected,
                    }))
                  );
                }}
                indeterminate={isPartiallySelected}
                checked={isFullySelected}
              />
            </ListItemAvatar>
            <ListItemSecondaryAction>
              <Typography>
                {selectedCounter} / {data.users.length}
              </Typography>
            </ListItemSecondaryAction>
            <ListItemText
              primary="Selecionar todos"
              primaryTypographyProps={{ fontSize: 18 }}
            />
          </ListItem>
          <Divider />

          {users.value
            .filter((u) => u.name.toUpperCase().includes(value))
            .map((user) => {
              return (
                <>
                  <ListItemButton
                    key={user.id}
                    onClick={() =>
                      users.modifyById(user.id, {
                        ...user,
                        selected: !user.selected,
                      })
                    }
                  >
                    <ListItemAvatar>
                      <Checkbox readOnly checked={user.selected} />
                    </ListItemAvatar>

                    <ListItemText
                      primary={user.name}
                      primaryTypographyProps={{ fontSize: 17 }}
                    />
                  </ListItemButton>

                  <Divider />
                </>
              );
            })}
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={download}>Exportar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeadlineExportDialog;
