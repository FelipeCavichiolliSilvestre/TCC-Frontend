import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

import ExportList from './ExportList';
import ExportProvider from '../../../contexts/ExportContext';
import DowloadButton from './DowloadButton';

function DeadlineExportDialog({ open, onClose, value: deadline }) {
  if (!deadline) return <></>;
  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <ExportProvider deadline={deadline}>
        <DialogTitle>Exportar disponibilidades</DialogTitle>
        <DialogContent>
          <ExportList />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <DowloadButton onClose={onClose} />
        </DialogActions>
      </ExportProvider>
    </Dialog>
  );
}

export default DeadlineExportDialog;
