import React from 'react';
import { Box } from '@mui/material';
import StatusIcon, { statusLoading } from '../Status/StatusIcon';
import StatusMessage from '../Status/StatusMessage';
import ResetButton from '../Button/ResetButton';
import { FormSubmitComponentProps } from '../../interfaces/interfaces';
import SubmitButton from '../Button/SubmitButton';
import { LoadingStatus } from '../../hooks/useAPI';

const FormSubmitComponent: React.FC<FormSubmitComponentProps> = ({
  changeCount,
  errorCount,
  loading,
  onSubmit,
  onReset,
  onErrorClick,
  statusMessage,
}) => {
  const isSubmitting = loading.displayName === LoadingStatus.LOADING;
  const isSuccess = loading.displayName === LoadingStatus.SUCCESS && errorCount === 0;
  const isError = loading.displayName === LoadingStatus.ERROR || errorCount > 0;

  const loadingState: statusLoading = { isSubmitting, isSuccess, isError };

  const hasChanges = changeCount > 0;
  const canReset = changeCount > 0 || isSuccess || isError;
  const disabled = isSuccess || !hasChanges || isError || isSubmitting;

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
          mr: 2,
        }}
      >
        <StatusIcon loadingState={loadingState} onErrorClick={onErrorClick} />
        <StatusMessage  message={statusMessage} />
      </Box>
      <Box sx={{display: 'flex',gap: 2}}> 
        <SubmitButton onClick={onSubmit} disabled={!canReset} />
        <ResetButton onClick={onReset} disabled={disabled} />
      </Box>
    </Box>
  );
};

export default FormSubmitComponent;
