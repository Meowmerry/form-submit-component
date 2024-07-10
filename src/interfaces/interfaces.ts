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
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    quoteNumber: string;
    status: string;
    request: string;
}


export interface FormState {
    formData: FormData;
    resetState: () => void;
}