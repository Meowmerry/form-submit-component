import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormSubmitComponent from './FormSubmitComponent';
import { useFormStore } from '../../store/useFormSubmit';
import { useAPI, LoadingStatus } from '../../hooks/useAPI';
import { schema, FormData } from '../../models/FormData';
import { quoteStatus } from '../../mockData/data';
import '../../css/FormComponent.css';
import DialogModal from '../DialogModal/DialogModal';

const FormComponent: React.FC = () => {
  const { formData } = useFormStore();
  const { callAPI, loading, reset: resetStatus } = useAPI();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
    reset,
    setValue,
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const onSubmit = useCallback(async (data: FormData) => {
    await callAPI(data);
  }, [callAPI]);

  const handleReset = useCallback(() => {
    reset();
    resetStatus();
  }, [reset, resetStatus]);

  const handleErrorClick = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  useEffect(() => {
    if (loading.displayName === LoadingStatus.SUCCESS) {
      Object.entries(formData).forEach(([key, value]) => {
        setValue(key as keyof FormData, value);
      });
    }
  }, [loading, formData, setValue]);

  const changeCount: number = Object.keys(dirtyFields).length;
  const errorCount: number = Object.keys(errors).length;

  const statusMessage = useMemo(() => {
    if (loading.displayName === LoadingStatus.LOADING) return 'Submitting...';
    if (errorCount) return `${errorCount} validation error${errorCount > 1 ? 's' : ''}`;
    if (loading.displayName === LoadingStatus.ERROR) return 'Error: Failed to save.';
    if (loading.displayName === LoadingStatus.SUCCESS) return 'Changes saved successfully.';
    if (changeCount) return `${changeCount} unsaved change${changeCount > 1 ? 's' : ''}`;
    return 'No changes';
  }, [loading, changeCount, errorCount]);
  
  const validationError =  Object.keys(errors)
  
  const allValidationErrors = useMemo(() => {
    const allErrors: Partial<Record<keyof FormData, string>> = {};
    validationError.forEach((key:string) => {
      const fieldErrors = errors[key as keyof FormData];
      if (fieldErrors?.types) {
        allErrors[key as keyof FormData] = Object.values(fieldErrors.types).join(', ');
      } else {
        allErrors[key as keyof FormData] = fieldErrors?.message || '';
      }
    });
    return allErrors
  }, [validationError,errors]);

  const messageErrorModal = loading.displayName === LoadingStatus.ERROR ? loading.message : statusMessage;

  const validationErrorMessage = Object.values(allValidationErrors).join('\n')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} height={110}>
          <label>First name *</label>
          <input type="text" {...register("firstName")} />
          {errors.firstName && (
            <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5, fontWeight: 600 }}>
              {Object.values(errors.firstName.types || { default: errors.firstName.message }).join(', ')}
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={6}  height={110}>
          <label>Last name *</label>
          <input type="text" {...register("lastName")} />
          {errors.lastName && (
            <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5, fontWeight: 600 }}>
              {Object.values(errors.lastName.types || { default: errors.lastName.message }).join(', ')}
            </Box>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} height={110}>
          <label>Email *</label>
          <input type="text" {...register("email")} />
          {errors.email && (
            <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5, fontWeight: 600 }}>
              {Object.values(errors.email.types || { default: errors.email.message }).join(', ')}
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={6} height={110}>
          <label>Mobile number *</label>
          <input type="tel" {...register("phone")} />
          {errors.phone && (
            <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5, fontWeight: 600 }}>
              {Object.values(errors.phone.types || { default: errors.phone.message }).join(', ')}
            </Box>
          )}
        </Grid>
      </Grid>
      <Grid  height={85}>
      <label>Quote Number *</label>
      <input type="number" {...register("quoteNumber")} />
      {errors.quoteNumber && (
        <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5, fontWeight: 600 }}>
          {Object.values(errors.quoteNumber.types || { default: errors.quoteNumber.message }).join(', ')}
        </Box>
      )}
      </Grid>
     <Grid height={80}>
     <label>Status Type *</label>
      <Controller
        name="status"
        defaultValue=""
        control={control}
        render={({ field }) => (
          <div style={{ width: '100%', marginBottom: '16px' }}>
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
              {quoteStatus.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            {errors.status && (
              <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5, fontWeight: 600 }}>
                {Object.values(errors.status.types || { default: errors.status.message }).join(', ')}
              </Box>
            )}
          </div>
        )}
      />
     </Grid>
      <Grid height={125}>
      <label>Request Detail *</label>
      <input type="text" {...register("request")} style={{ height: 80 }} />
      {errors.request && (
        <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5, fontWeight: 600 }}>
          {Object.values(errors.request.types || { default: errors.request.message }).join(', ')}
        </Box>
      )}
      </Grid>
      <Box sx={{ mt: 2 }}>
        <FormSubmitComponent
          changeCount={changeCount}
          errorCount={errorCount}
          isSubmitting={loading.displayName === LoadingStatus.LOADING}
          isSuccess={loading.displayName === LoadingStatus.SUCCESS && errorCount === 0}
          isError={loading.displayName === LoadingStatus.ERROR || errorCount > 0}
          onSubmit={handleSubmit(onSubmit)}
          onReset={handleReset}
          onErrorClick={handleErrorClick}
          statusMessage={statusMessage}
          errorMessage={loading.message}
        />
      </Box>
      <DialogModal
        isOpen={isModalOpen}
        message={messageErrorModal}
        validationErrorMessage={validationErrorMessage}
        onClose={handleClose}
      />
    </form>
  );
};

export default FormComponent;
