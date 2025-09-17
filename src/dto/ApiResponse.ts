export class ApiResponse<T> {
    private message: string | undefined
    private readonly data: T;

    constructor(data: T) {
        this.data = data;
    }

    getData(): T {
        return this.data;
    }

    getMessage(): string {
        return this.message || '';
    }
}