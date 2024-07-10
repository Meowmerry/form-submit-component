import create from 'zustand';
import {FormState} from '../interfaces/interfaces';

export const useFormStore = create<FormState>((set) => ({
    formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        quoteNumber: '',
        status: '',
        request: '',
    },
    resetState: () =>
        set((state) => ({
            ...state,
            isError: false,
            errorMessage: '',
            formData: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                quoteNumber: '',
                status: '',
                request: '',
            },
        }))
}));
