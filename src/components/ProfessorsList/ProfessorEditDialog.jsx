import Stack from '@mui/material/Stack';
import EditDialog from '../EditDialog.jsx';

import { FormProvider } from 'react-hook-form';
import { useEffect } from 'react';
import { useBoolean } from 'react-hanger';
import useEditProfessorForm from './useEditDeadlineForm.js';
import FormTextField from '../Form/FormTextField';
import { useProfessors } from '../../contexts/ProfessorsContext.jsx';

function ProfessorEditDialog({ value: professor, ...props }) {
  const { handleSubmit, reset, ...formMethods } = useEditProfessorForm();
  const { updateProfessor } = useProfessors();
  const loading = useBoolean(false);

  useEffect(() => {
    professor && reset(professor);
  }, [professor]);

  async function submit({ name, email, role }) {
    try {
      loading.setTrue();

      await updateProfessor(professor.id, { name, email, role });

      props.onClose();
    } finally {
      loading.setFalse();
    }
  }

  return (
    <EditDialog
      title="Editar professor"
      loading={loading.value}
      onConfirm={handleSubmit(submit)}
      {...props}
    >
      <FormProvider {...formMethods}>
        <Stack spacing={2}>
          <FormTextField name="name" label="Nome" />
          <FormTextField name="email" label="Email" />
        </Stack>
      </FormProvider>
    </EditDialog>
  );
}

export default ProfessorEditDialog;
