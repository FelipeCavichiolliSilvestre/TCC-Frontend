import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const editProfessorSchema = yup.object({}).required();

const useEditProfessorForm = (defaultValues) => {
  return useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(editProfessorSchema),
  });
};

export default useEditProfessorForm;
