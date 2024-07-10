import React, { useCallback, useEffect, useMemo } from 'react';
import { TextField, Box, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm,Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormSubmitComponent from './FormSubmitComponent';
import { useFormStore } from '../store/useFormSubmit';
import { useAPI } from '../hooks/useAPI';
import { schema, FormData } from '../models/FormData';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {servicesOptions} from '../mockData/data';
import {DatePickerCustom} from '../style/DatePickerCustom';

const FormComponent: React.FC = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, dirtyFields },
        reset,
        setValue
      } = useForm<FormData>({
        mode: 'onChange',
        resolver: zodResolver(schema),
        defaultValues:{
            services: '',
            date: null
        }
      });

  const { callAPI, error: apiError, reset: resetData, success, loading } = useAPI();

  const {
    isError,
    errorMessage,
    formData,
    setError,
    resetState,
    updateFormData,
    clearAllData
  } = useFormStore();

  useEffect(() => {
    if (formData.name || formData.email) {
      setValue('name', formData.name);
      setValue('email', formData.email);
    }
  }, [formData, setValue]);

  const onSubmit = useCallback(async (data: FormData) => {
    try {
      await callAPI(data);
      updateFormData(data);
      reset(data);
    } catch (error) {
      setError(apiError);
    }
  }, [callAPI, updateFormData, reset, setError, apiError]);

  const handleReset = useCallback(() => {
    reset();
    resetData();
    setValue('name', '');
    setValue('email', '');
    resetState();
    clearAllData();
  }, [reset, resetData, setValue, resetState, clearAllData]);

  const changeCount = Object.keys(dirtyFields).length;
  const errorCount = Object.keys(errors).length;

  const statusMessage = useMemo(() => {
    if (loading) return 'Submitting...';
    if (errorCount) return `${errorCount} validation error${errorCount > 1 ? 's' : ''}`;
    if (isError) return 'Error: Failed to save..';
    if (changeCount) return `${changeCount} unsaved change${changeCount > 1 ? 's' : ''}`;
    if (success) return 'Changes saved successfully..';
    return 'No changes';
  }, [loading, success, isError, changeCount, errorCount]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('name')}
        label="First & Last Name"
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
          style: { background: '#fff', borderRadius: 4  }
        }}
      />
      
       <FormControl fullWidth margin="normal">
        <InputLabel id="services-label">Services</InputLabel>
        <Controller
          name="services"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              labelId="services-label"
              label="Select Services"
              error={!!errors.services}
              style={{ background: '#fff', borderRadius: 4  }}
            >
            {servicesOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
                ))}
            </Select>
          )}
        />
        {errors.services && <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5 }}>{errors.services.message}</Box>}
      </FormControl>
       {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePickerCustom label="Select date" />
      </DemoContainer>
      </LocalizationProvider> */}
      <TextField
        {...register('description')}
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        error={!!errors.description}
        helperText={errors.description?.message}
        InputProps={{
          style: { background: '#fff', borderRadius: 4 }
        }}
      />
    
      <Box sx={{ mt: 2 }}>
        <FormSubmitComponent
          changeCount={changeCount}
          errorCount={errorCount}
          isSubmitting={loading}
          isSuccess={success && errorCount === 0 && !isError}
          isError={isError || errorCount > 0}
          onSubmit={handleSubmit(onSubmit)}
          onReset={handleReset}
          onErrorClick={() => alert(errorMessage)}
          statusMessage={statusMessage}
          errorMessage={errorMessage}
        />
      </Box>
    </form>
  );
};

export default FormComponent;