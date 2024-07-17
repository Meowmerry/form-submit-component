import React from 'react';
import { Box, Modal, Typography, Button } from '@mui/material';
import { Loading, LoadingStatus } from '../../hooks/useAPI';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface DialogModalProps {
  isOpen: boolean;
  loading: Loading;
  message: string;
  validationErrorMessage: string;
  onClose: () => void;
}

const DialogModal: React.FC<DialogModalProps> = ({ isOpen, loading, message, validationErrorMessage, onClose }) => {
  const messageModal = loading.displayName === LoadingStatus.SUCCESS ? loading.message : message;

  const formattedValidationErrorMessage = validationErrorMessage.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line ? `- ${line}` : ''}
      <br />
    </React.Fragment>
  ));

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
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
        <Typography id="modal-title" variant="h6" component="h2">
          {loading.displayName === LoadingStatus.SUCCESS? 'Success' :'Error' }
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {loading.displayName === LoadingStatus.SUCCESS ? (
            <div className="text-success"><CheckCircleIcon color="success" sx={{ mr: 1 }} />{messageModal}</div>
          ) : (
            <div className="text-error"><ErrorIcon color="error" sx={{ mr: 1 }} />{messageModal}</div>
          )}
        </Typography>
        {validationErrorMessage && (
          <Typography id="modal-description" sx={{ mt: 2 }} className="text-error">
            {formattedValidationErrorMessage}
          </Typography>
        )}
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default DialogModal;
