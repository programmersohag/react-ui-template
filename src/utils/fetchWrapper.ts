import {HttpError} from './errors';

async function fetchWrapper<T>(url: string, options?: RequestInit): Promise<T> {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            // Handle non-2xx status codes by throwing a custom error
            const errorData = await response.json().catch(() => ({}));
            throw new HttpError(errorData.message || response.statusText, response);
        }
        // `response.json()` is also asynchronous
        return await response.json() as T;
    } catch (error) {
        // This `catch` handles network failures, `HttpError`, and parsing errors
        console.error('Fetch error caught globally:', error);
        // Re-throw the error to allow the local component `catch` to handle it
        throw error;
    }
}

export default fetchWrapper;