// Status Icon component
import React from 'react';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface StatusIconProps {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  onErrorClick: () => void;
}

const StatusIcon: React.FC<StatusIconProps> = ({ isSubmitting, isSuccess, isError, onErrorClick }) => {
  if (isSubmitting) return <CircularProgress size={24} sx={{ mr: 1 }} />;
  if (isSuccess) return <CheckCircleIcon color="success" sx={{ mr: 1 }} />;
  if (isError) {
    return (
      <Tooltip title="Click for more info">
        <IconButton onClick={onErrorClick} size="small">
          <ErrorIcon color="error" />
        </IconButton>
      </Tooltip>
    );
  }
  return null;
};

export default StatusIcon;
