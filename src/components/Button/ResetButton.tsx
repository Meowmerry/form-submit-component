// Reset button component
import React from 'react';
import { Button } from '@mui/material';

interface ResetButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick, disabled }) => (
  <Button
    variant="contained" 
    onClick={onClick}
    disabled={disabled}
    className="btn-reset"
  >
    Reset
  </Button>
);

export default ResetButton;