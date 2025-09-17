import {useCallback} from 'react';
import {useError} from "../context/ErrorContext.ts";
import FetchWrapper from "../utils/fetchWrapper.ts";
import {HttpError} from "../utils/errors.ts";

export function useFetch() {
    const { setError } = useError();

    return useCallback(async <T, >(
        url: string,
        options?: RequestInit
    ): Promise<T> => {
        try {
            return await FetchWrapper<T>(url, options);
        } catch (error) {
            if (error instanceof HttpError) {
                // Handle specific server-side errors
                setError(`Server Error: ${error.response.status} - ${error.message}`);
            } else if (error instanceof Error) {
                // Handle network or other errors
                setError(`Failed to fetch data: ${error.message}`);
            } else {
                setError('An unknown error occurred.');
            }
            throw error; // Re-throw to allow component-level handling
        }
    }, [setError]);
}