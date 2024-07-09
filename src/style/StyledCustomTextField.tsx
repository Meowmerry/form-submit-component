import React, { useState } from 'react';
import { TextField as MuiTextField, TextFieldProps, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { withStyles, Theme } from '@material-ui/core/styles';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'variant' | 'type'> {
  type?: string;
  toggleVisibility?: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ type, toggleVisibility, InputProps, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <MuiTextField
      {...props}
      type={toggleVisibility ? (showPassword ? 'text' : 'password') : type}
      InputProps={{
        ...InputProps,
        endAdornment: toggleVisibility && (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

const StyledCustomTextField = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 4,
    '& .MuiInputBase-root': {
      color: '#000',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.23)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.87)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.87)',
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.85rem',
      padding: '4px'
    },
  },
}))(CustomTextField);

export default StyledCustomTextField;
