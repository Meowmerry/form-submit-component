export interface FormSubmitComponentProps {
    changeCount: number;
    errorCount: number;
    isSubmitting: boolean;
    isSuccess: boolean;
    isError: boolean;
    onSubmit: () => void;
    onReset: () => void;
    onErrorClick: () => void;
    statusMessage: React.ReactNode;
    errorMessage: string;
}

export interface FormData {
    name: string;
    email: string;
    services: string;
    date: Date | null | undefined;
    description?: string;
}

export interface FormState {
    isError: boolean;
    errorMessage: string;
    formData: FormData;
    setError: (errorMessage: string) => void;
    resetState: () => void;
    updateFormData: (data: FormData) => void;
    clearAllData: () => void;
}