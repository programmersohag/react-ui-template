import {useState, type ReactNode} from 'react';
import {ErrorContext} from './ErrorContext.ts';

export const ErrorProvider = ({children}: { children: ReactNode }) => {
    const [error, setError] = useState<string | null>(null);

    const dismissError = () => setError(null);

    return (
        <ErrorContext.Provider value={{error, setError, dismissError}}>
            {children}
        </ErrorContext.Provider>
    );
};