// Status Icon component
import React from 'react';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface StatusIconProps {
  loadingState: statusLoading;
  onErrorClick: () => void;
}
export interface statusLoading {
  isSubmitting: boolean
  isSuccess:boolean
  isError:boolean
}

const StatusIcon: React.FC<StatusIconProps> = ({ loadingState, onErrorClick }) => {
  if (loadingState.isSubmitting) return <CircularProgress size={24} sx={{ mr: 1 }} />;
  if (loadingState.isSuccess) return <CheckCircleIcon color="success" sx={{ mr: 1 }} />;
  if (loadingState.isError) {
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
