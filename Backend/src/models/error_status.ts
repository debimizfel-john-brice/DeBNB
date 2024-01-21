abstract class ErrorStatus {
    message: string;
    status: number;

    constructor(message: string, status: number) {
        this.message = message;
        this.status = status;
    }
}

export class RouteNotFound extends ErrorStatus {
    constructor(route: string) {
        super(`Route ${route} not found`, 404);
    }
}

export class ResourceNotFound extends ErrorStatus {
    constructor(id: number) {
        super(`Id ${id} not found`, 404);
    }
}

export class InvalidInput extends ErrorStatus {
    constructor(message: string) {
        super(message, 400);
    }
}

export class ValidationError extends ErrorStatus {
    public constructor(message: string) {
        super(message, 400);
    }
}

export class UnauthorizedError extends ErrorStatus {
    public constructor(message: string) {
        super(message, 401);
    }
}