import React from 'react';
import { Container, TextField, Typography, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import FormSubmitComponent from './components/FormSubmitComponent';
import STREAMICON from './assets/stream-icon.png';
import './App.css';
import {useFormStore} from './store/useFormSubmit';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});
type FormData = z.infer<typeof schema>;

function App() {
  const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });


  const { isSubmitting, isSuccess, isError, errorMessage, setSubmitting, setSuccess, setError } = useFormStore();

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess(true);
      reset(data);
    } catch (error) {
      setError('Failed to save. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const changeCount = Object.keys(dirtyFields).length;
  const errorCount = Object.keys(errors).length;

  return (
    <Container maxWidth="sm">
     <Typography className='form-header'> <img src={STREAMICON} alt="Stream Icon" className='steam-icon' /></Typography>
     <Typography variant="h5" className='form-header'>Steam Logistics</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('name')}
          label="Name"
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name?.message}
          InputProps={{
            style: { background: '#fff', borderRadius: 4 }
          }}
        />
        <TextField
          {...register('email')}
          label="Email"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
          InputProps={{
            style: { background: '#fff', borderRadius: 4 }
          }}
        />
        <Box sx={{ mt: 2 }}>
          <FormSubmitComponent
            changeCount={changeCount}
            errorCount={errorCount}
            isSubmitting={isSubmitting}
            isSuccess={isSuccess}
            isError={isError}
            onSubmit={handleSubmit(onSubmit)}
            onReset={() => reset()}
            onErrorClick={() => alert(errorMessage)}
            statusMessage={
              isSubmitting ? 'Submitting...' :
              isSuccess ? 'Changes saved successfully' :
              isError ? 'Error: Failed to save' :
              changeCount > 0 ? `${changeCount} unsaved change${changeCount > 1 ? 's' : ''}` :
              errorCount > 0 ? `${errorCount} validation error${errorCount > 1 ? 's' : ''}` :
              'No changes' // If there are no changes, display a “no changes”
            }
            errorMessage={errorMessage}
          />
        </Box>
      </form>
    </Container>
  );
}

export default App;
