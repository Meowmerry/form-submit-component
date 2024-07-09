import create from 'zustand';

interface StoreState {
    isSubmitting: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    setSubmitting: (isSubmitting: boolean) => void;
    setSuccess: (isSuccess: boolean) => void;
    setError: (errorMessage: string) => void;
}

export const useFormStore = create<StoreState>((set) => ({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    setSubmitting: (isSubmitting) => set({isSubmitting}),
    setSuccess: (isSuccess) => set({isSuccess, isError: false, errorMessage: ''}),
    setError: (errorMessage) => set({isError: true, isSuccess: false, errorMessage}),
}));