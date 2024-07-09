// FormSubmitComponent component
import React from 'react';
import { Box } from '@mui/material';
import StatusIcon from './StatusIcon';
import StatusMessage from './StatusMessage';
import SubmitButton from './SubmitButton';
import ResetButton from './ResetButton';

interface FormSubmitComponentProps {
  changeCount: number;
  errorCount: number;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  onSubmit: () => void;
  onReset: () => void;
  onErrorClick: () => void;
  statusMessage: React.ReactNode;
  errorMessage: string;
}

const FormSubmitComponent: React.FC<FormSubmitComponentProps> = ({
  changeCount,
  errorCount,
  isSubmitting,
  isSuccess,
  isError,
  onSubmit,
  onReset,
  onErrorClick,
  statusMessage,
}) => {

  const hasChanges = changeCount > 0;
  const hasErrors = errorCount > 0;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderTop: '1px solid #ccc' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <StatusIcon
          isSubmitting={isSubmitting}
          isSuccess={isSuccess}
          isError={isError}
          onErrorClick={onErrorClick}
        />
        <StatusMessage message={statusMessage} />
      </Box>
      <Box>
        <SubmitButton
          onClick={onSubmit}
          disabled={!hasChanges || hasErrors || isSubmitting}
        />
        <ResetButton
          onClick={onReset}
          disabled={!hasChanges}
        />
      </Box>
    </Box>
  );
};

export default FormSubmitComponent;
