import {createContext, useContext} from 'react';

interface ErrorContextType {
    error: string | null;
    setError: (message: string) => void;
    dismissError: () => void;
}

export const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useError must be used within an ErrorProvider');
    }
    return context;
};