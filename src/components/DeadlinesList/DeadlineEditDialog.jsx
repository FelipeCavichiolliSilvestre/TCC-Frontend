import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import api from '@/api';
import useSWR from 'swr';
import { useArray } from 'react-hanger';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useDeadlines } from '@/contexts/DeadlinesContext';
import useEditDeadlineForm from './useEditDeadlineForm.js';
import { FormProvider } from 'react-hook-form';

function DeadlineEditDialog({ open, onClose, value: deadline, onSave }) {
  const { handleSubmit, reset, ...formMethods } = useEditDeadlineForm();
  const {} = useDeadlines();

  useEffect(() => {
    reset();
  });

  async function submit() {}

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Exportar disponibilidades</DialogTitle>
      <DialogContent>
        <FormProvider {...formMethods}>
          <></>
        </FormProvider>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit(submit)}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeadlineEditDialog;
