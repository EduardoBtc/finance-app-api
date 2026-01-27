class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`User with provided email ${email} already exists`);
        this.name = 'EmailAlreadyInUseError';
    }
}

class UserNotFoundError extends Error {
    constructor(userId) {
        super(`User with ID ${userId} not found`);
        this.name = 'UserNotFoundError';
    }
}

export { EmailAlreadyInUseError, UserNotFoundError };
