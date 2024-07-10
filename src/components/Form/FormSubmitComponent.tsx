// FormSubmitComponent component
import React from 'react';
import { Box } from '@mui/material';
import StatusIcon from '../Status/StatusIcon';
import StatusMessage from '../Status/StatusMessage';
import ResetButton from '../Button/ResetButton';
import { FormSubmitComponentProps } from '../../interfaces/interfaces';
import SubmitButton from '../Button/SubmitButton';

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
  const canReset = changeCount > 0 || isSuccess || isError;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderTop: '1px solid #ccc',
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: { xs: 2, sm: 0 },
          flexGrow: 1,
        }}
      >
        <StatusIcon
          isSubmitting={isSubmitting}
          isSuccess={isSuccess}
          isError={isError}
          onErrorClick={onErrorClick}
        />
        <StatusMessage message={statusMessage} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        <SubmitButton
          onClick={onSubmit}
          disabled={!hasChanges || hasErrors || isSubmitting}
        />
        <ResetButton onClick={onReset} disabled={!canReset} />
      </Box>
    </Box>
  );
};

export default FormSubmitComponent;
