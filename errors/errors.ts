export const errors = {
    // 400
    BAD_REQUEST_USER_ALREADY_EXIST: { // Error when user wants to register. But this user already exists
        message: 'User already exists',
        code: 400
    },

    // 401
    UNAUTHORIZED_WRONG_CREDENTIALS: {
        code: 401,
        message: 'Wrong email or password'
    },

    // 404
    NOT_FOUND_USER_NOT_PRESENT: { // When user wants to login, but email is not found in DB
        message: 'User is not found',
        code: 404
    }
};