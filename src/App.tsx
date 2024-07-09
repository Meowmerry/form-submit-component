import React, { useEffect } from 'react';
import { Container, TextField, Typography, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import FormSubmitComponent from './components/FormSubmitComponent';
import STREAMICON from './assets/stream-icon.png';
import './App.css';
import { useFormStore } from './store/useFormSubmit';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});
type FormData = z.infer<typeof schema>;

function App() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, dirtyFields }, 
    reset, 
    setValue 
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { 
    isSubmitting, 
    isSuccess, 
    isError, 
    errorMessage, 
    formData,
    setSubmitting, 
    setSuccess, 
    setError,
    resetState,
    updateFormData, 
    clearAllData
  } = useFormStore();

  // Load saved data from localStorage on component mount
  useEffect(() => {
    if (formData.name || formData.email) {
      setValue('name', formData.name);
      setValue('email', formData.email);
    }
  }, [formData, setValue]);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      // API Call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      updateFormData(data); // Save form data to localStorage
      setSuccess(true);
      reset(data);
    } catch (error) {
      setError('Failed to save. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    setValue('name', '');
    setValue('email', '');
    resetState();
    clearAllData()
  };

  const changeCount = Object.keys(dirtyFields).length;
  const errorCount = Object.keys(errors).length;

  const statusMessage = 
    isSubmitting ? 'Submitting...' :
    isSuccess ? 'Changes saved successfully' :
    isError ? 'Error: Failed to save' :
    changeCount > 0 ? `${changeCount} unsaved change${changeCount > 1 ? 's' : ''}` :
    errorCount > 0 ? `${errorCount} validation error${errorCount > 1 ? 's' : ''}` :
    'No changes';

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
            onReset={handleReset}
            onErrorClick={() => alert(errorMessage)}
            statusMessage={statusMessage}
            errorMessage={errorMessage}
          />
        </Box>
      </form>
    </Container>
  );
}

export default App;