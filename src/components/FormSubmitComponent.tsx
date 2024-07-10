// FormSubmitComponent component
import React from 'react';
import { Box } from '@mui/material';
import StatusIcon from './StatusIcon';
import StatusMessage from './StatusMessage';
import SubmitButton from './SubmitButton';
import ResetButton from './ResetButton';
import {FormSubmitComponentProps} from '../interfaces/interfaces';


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
    <Box  sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      p: 2,
      borderTop: '1px solid #ccc',
      flexDirection: { xs: 'column', sm: 'row' }, // xs: extra-small screens, sm: small screens and up
    }} >
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
          disabled={!canReset}
        />
      </Box>
    </Box>
  );
};

export default FormSubmitComponent;



