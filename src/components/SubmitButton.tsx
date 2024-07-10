// Submit button component
import React from 'react';
import {Button} from '@mui/material';

interface SubmitButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({onClick, disabled}) => (
  <Button
    variant="contained"
    className="btn-submit"
    onClick={onClick}
    disabled={disabled} // message and make action buttons unclickable.
    sx={{mr: 1}}
  >
    Submit
  </Button>
);

export default SubmitButton;
