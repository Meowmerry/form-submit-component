// useFormStore
import create from 'zustand';
import {FormState} from '../interfaces/interfaces';

export const useFormStore = create<FormState>(
    (set) => ({
        isError: false,
        errorMessage: '',
        formData: {name: '', email: '', services: '', date: null, description: ''},
        setError: (errorMessage) => set({isError: true, errorMessage}),
        resetState: () => set({
            isError: false,
            errorMessage: '',
            formData: {name: '', email: '', services: '', date: null, description: ''}
        }),
        updateFormData: (data) => set({formData: data}),
        clearAllData: () => set({
            isError: false,
            errorMessage: '',
            formData: {name: '', email: '', services: '', date: null, description: ''}
        })
    })
);
