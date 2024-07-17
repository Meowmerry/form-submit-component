import {Loading} from "../hooks/useAPI";

export interface FormSubmitComponentProps {
    changeCount: number;
    errorCount: number;
    loading: Loading;
    onSubmit: () => void;
    onReset: () => void;
    onErrorClick: () => void;
    statusMessage: React.ReactNode;
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