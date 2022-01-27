export const errors = {
    // 400
    BAD_REQUEST_USER_ALREADY_EXIST: { // Error when user wants to register. But this user already exists
        message: 'User already exists'
    },

    // 401
    UNAUTHORIZED_WRONG_CREDENTIALS: {
        message: 'Wrong email or password'
    },

    // 404
    NOT_FOUND_USER_NOT_PRESENT: { // When user wants to login, but email is not found in DB
        message: 'User is not found'
    },
    UNAUTHORIZED_WRONG_TOKEN: {
        message: 'Invalid token'
    },
    // 409
    ALREADY_EXISTS: {
        message: 'already exists' // when email already exists
    },
    // 403
    FORBIDDEN: {
        message: 'Access denied' // DENied when user role is forbidden
    }
};
