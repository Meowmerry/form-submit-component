import React from 'react';
import { Box, Modal, Typography, Button } from '@mui/material';

interface DialogModalProps {
  isOpen: boolean;
  message: string;
  validationErrorMessage:string
  onClose: () => void;
}

const DialogModal: React.FC<DialogModalProps> = ({ isOpen, message,validationErrorMessage, onClose }) => {

  const formattedValidationErrorMessage = validationErrorMessage.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      - {line}
      <br />
    </React.Fragment>
  ));
 
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-description"
    >
          <Box sx={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -20%)',
        width: '90%',
        maxWidth: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto',
        '@media (max-width: 600px)': {
          top: '20%',
          maxWidth: 200,
          p: 2,
        }
      }}>
        <Typography id="error-modal-title" variant="h6" component="h2">
          Error
        </Typography>
        <Typography id="error-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Typography id="error-modal-description" sx={{ mt: 2 }}>
          {formattedValidationErrorMessage}
        </Typography>
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default DialogModal;
