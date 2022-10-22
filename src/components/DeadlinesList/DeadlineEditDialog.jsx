import Stack from '@mui/material/Stack';
import EditDialog from '../EditDialog.jsx';
import FormDateField from '../Form/FormDateField.jsx';

import useEditDeadlineForm from './useEditDeadlineForm.js';
import { FormProvider } from 'react-hook-form';
import { useEffect } from 'react';
import { useDeadlines } from '../../contexts/DeadlinesContext';
import { useBoolean } from 'react-hanger';

function DeadlineEditDialog({ value: deadline, ...props }) {
  const { handleSubmit, reset, ...formMethods } = useEditDeadlineForm();
  const { updateDeadline } = useDeadlines();
  const loading = useBoolean(false);

  useEffect(() => {
    deadline && reset(deadline);
  }, [deadline]);

  async function submit({ fromDate, toDate }) {
    try {
      loading.setTrue();
      await updateDeadline(deadline.id, {
        fromDate,
        toDate,
      });
      props.onClose();
    } finally {
      loading.setFalse();
    }
  }

  return (
    <EditDialog
      title="Editar prazo"
      loading={loading.value}
      onConfirm={handleSubmit(submit)}
      {...props}
    >
      <FormProvider {...formMethods}>
        <Stack spacing={2}>
          <FormDateField
            maxDate={formMethods.watch('toDate')}
            name="fromDate"
            label="Data de início"
          />
          <FormDateField
            minDate={formMethods.watch('fromDate')}
            name="toDate"
            label="Data de término"
          />
        </Stack>
      </FormProvider>
    </EditDialog>
  );
}

export default DeadlineEditDialog;
