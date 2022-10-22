import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const editDeadlineSchema = yup
  .object({
    fromDate: yup.date().required(),
    toDate: yup.date().required().min(yup.ref('fromDate')),
  })
  .required();

const useEditDeadlineForm = (defaultValues) => {
  return useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(editDeadlineSchema),
  });
};

export default useEditDeadlineForm;
