// src/store/useFormStore.ts
import create from 'zustand';
import {persist} from 'zustand/middleware';

interface FormData {
    name: string;
    email: string;
}

interface FormState {
    isSubmitting: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    formData: FormData;
    setSubmitting: (isSubmitting: boolean) => void;
    setSuccess: (isSuccess: boolean) => void;
    setError: (errorMessage: string) => void;
    resetState: () => void;
    updateFormData: (data: FormData) => void;
    clearAllData: () => void;
}

export const useFormStore = create(
    persist<FormState>(
        (set) => ({
            isSubmitting: false,
            isSuccess: false,
            isError: false,
            errorMessage: '',
            formData: {name: '', email: ''},
            setSubmitting: (isSubmitting) => set({isSubmitting}),
            setSuccess: (isSuccess) => set({isSuccess, isError: false, errorMessage: ''}),
            setError: (errorMessage) => set({isError: true, isSuccess: false, errorMessage}),
            resetState: () => set({
                isSubmitting: false,
                isSuccess: false,
                isError: false,
                errorMessage: '',
                formData: {name: '', email: ''}
            }),
            updateFormData: (data) => set({formData: data}),
            clearAllData: () => {
                localStorage.removeItem('form-storage');
                set({
                    isSubmitting: false,
                    isSuccess: false,
                    isError: false,
                    errorMessage: '',
                    formData: {name: '', email: ''}
                });
            }
        }),
        {
            name: 'form-storage',
            getStorage: () => localStorage,
        }
    )
);