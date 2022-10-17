import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DeleteDialog({
  getTitle,
  getDesc,
  open,
  onClose,
  value,
  onConfirm,
  ...props
}) {
  if (!value) return <></>;

  return (
    <Dialog open={open} maxWidth="xs" fullWidth onClose={onClose} {...props}>
      <DialogTitle>{getTitle && getTitle(value)}</DialogTitle>
      <DialogContent>
        <DialogContentText>{getDesc && getDesc(value)}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={() => {
            if (onConfirm) onConfirm(value);
            onClose();
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
