import React, {useCallback, useEffect, useMemo} from 'react';
import {Box, Grid} from '@mui/material';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import FormSubmitComponent from './FormSubmitComponent';
import {useFormStore} from '../../store/useFormSubmit';
import {useAPI} from '../../hooks/useAPI';
import {schema, FormData} from '../../models/FormData';
import {statusType} from '../../mockData/data';
import '../../css/FormComponent.css';

const FormComponent: React.FC = () => {
  const {formData} = useFormStore();
  const {callAPI, error: apiError, reset: resetStatus, success, loading} = useAPI();
  const {
    register,
    handleSubmit,
    control,
    formState: {errors, dirtyFields},
    reset,
    setValue,
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(async (data: FormData) => {
    await callAPI(data);
  }, [callAPI]);

  const handleReset = useCallback(() => {
    reset();
    resetStatus();
  }, [reset, resetStatus]);

  useEffect(() => {
    if (success) {
      Object.entries(formData).forEach(([key, value]) => {
        setValue(key as keyof FormData, value);
      });
    }
  }, [success, formData, setValue]);

  const changeCount = Object.keys(dirtyFields).length;
  const errorCount = Object.keys(errors).length;

  const statusMessage = useMemo(() => {
    if (loading) return 'Submitting...';
    if (errorCount) return `${errorCount} validation error${errorCount > 1 ? 's' : ''}`;
    if (apiError) return 'Error: Failed to save.';
    if (success) return 'Changes saved successfully.';
    if (changeCount) return `${changeCount} unsaved change${changeCount > 1 ? 's' : ''}`;
    return 'No changes';
  }, [loading, success, apiError, changeCount, errorCount]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <label>First name *</label>
          <input
            type="text"
            {...register("firstName")}
          />
          {errors.firstName && (
            <Box sx={{color: 'error.main', fontSize: '0.75rem', mt: 0.5, fontWeight: 600}}>
              {errors.firstName.message}
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <label>Last name *</label>
          <input
            type="text"
            {...register("lastName")}
          />
          {errors.lastName && (
            <Box sx={{color: 'error.main', fontSize: '0.75rem', mt: 0.5, fontWeight: 600}}>
              {errors.lastName.message}
            </Box>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <label>Email *</label>
          <input
            type="text"
            {...register("email")}
          />
          {errors.email && (
            <Box sx={{color: 'error.main', fontSize: '0.75rem', mt: 0.5, fontWeight: 600}}>
              {errors.email.message}
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <label>Mobile number *</label>
          <input
            type="tel"
            {...register("phone")}
          />
          {errors.phone && (
            <Box sx={{color: 'error.main', fontSize: '0.75rem', mt: 0.5, fontWeight: 600}}>
              {errors.phone.message}
            </Box>
          )}
        </Grid>
      </Grid>
      <label>Quote Number *</label>
      <input
        type="number"
        {...register("quoteNumber")}
      />
      {errors.quoteNumber && (
        <Box sx={{color: 'error.main', fontSize: '0.75rem', mt: 0.5, fontWeight: 600}}>
          {errors.quoteNumber.message}
        </Box>
      )}
      <label>Status Type *</label>
      <Controller
        name="status"
        defaultValue=""
        control={control}
        render={({field}) => (
          <div style={{width: '100%', marginBottom: '16px'}}>
            <select
              {...field}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                background: '#fff',
                borderColor: errors.status ? 'red' : 'rgba(0, 0, 0, 0.23)'
              }}
            >
              <option value="" disabled>Select status type</option>
              {statusType.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            {errors.status && (
              <Box sx={{color: 'error.main', fontSize: '0.75rem', mt: 0.5, fontWeight: 600}}>
                {errors.status.message}
              </Box>
            )}
          </div>
        )}
      />
      <label>Request Detail *</label>
      <input
        type="text"
        {...register("request")}
        style={{height: 80}}
      />
      {errors.request && (
        <Box sx={{color: 'error.main', fontSize: '0.75rem', mt: 0.5, fontWeight: 600}}>
          {errors.request.message}
        </Box>
      )}
      <Box sx={{mt: 2}}>
        <FormSubmitComponent
          changeCount={changeCount}
          errorCount={errorCount}
          isSubmitting={loading}
          isSuccess={success && errorCount === 0 && !apiError}
          isError={!!apiError || errorCount > 0}
          onSubmit={handleSubmit(onSubmit)}
          onReset={handleReset}
          onErrorClick={() => alert(apiError)}
          statusMessage={statusMessage}
          errorMessage={apiError}
        />
      </Box>
    </form>
  );
};

export default FormComponent;
