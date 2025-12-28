class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`User with provided email ${email} already exists`);
        this.name = 'EmailAlreadyInUseError';
    }
}

export { EmailAlreadyInUseError };
