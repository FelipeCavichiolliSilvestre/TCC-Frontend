import { useExport } from '../../../contexts/ExportContext';
import LoadingButton from '@mui/lab/LoadingButton';
import { useBoolean } from 'react-hanger';

function DowloadButton({ onClose, ...props }) {
  const { dowload, isLoading } = useExport();
  const loading = useBoolean(false);

  async function onClick() {
    try {
      loading.setTrue();
      await dowload();
      await onClose();
    } finally {
      loading.setFalse();
    }
  }

  return (
    <LoadingButton
      loading={loading.value || isLoading}
      onClick={onClick}
      {...props}
    >
      Exportar
    </LoadingButton>
  );
}

export default DowloadButton;
