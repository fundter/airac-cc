class InvalidCycleIdentifierError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export {
    InvalidCycleIdentifierError
};