// Reset button component
import React from 'react';
import { Typography, Link } from '@mui/material';

interface StatusMessageProps {
  message: React.ReactNode;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ message }) => {
  // Status Message, if any, that can have links embedded
  if (typeof message === 'string') {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = message.split(urlRegex);

    return (
      <Typography variant="body2">
        {parts.map((part, index) => {
          if (part.match(urlRegex)) {
            return (
              <Link key={index} href={part} target="_blank" rel="noopener noreferrer">
                {part}
              </Link>
            );
          }
          return part;
        })}
      </Typography>
    );
  }
 
  // Otherwise render message directly
  return <Typography variant="body2">{message}</Typography>;
};

export default StatusMessage;