export const config = {
    PORT: process.env.PORT || 5000,
    HOST: process.env.PORT || 'http://localhost',
    API_URL: process.env.API_URL || 'http://localhost:5000',

    JWT_ACCESS_SECRET: process.env.PORT || 'exampleAccessToken',
    ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '1h',

    JWT_REFRESH_SECRET: process.env.PORT || 'exampleRefreshToken',
    REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '1h',

    JWT_FORGOT_PASSWORD_SECRET: process.env.PORT || 'exampleForgotPassword',
    JWT_FORGOT_PASSWORD_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '24h',

    ROOT_EMAIL: process.env.ROOT_EMAIL || 'email',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'password',
    ROOT_EMAIL_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'gmail',

    JWT_CONFIRM_EMAIL_SECRET: process.env.JWT_CONFIRM_EMAIL_SECRET || 'somethingToConfirm&123$blaBla',
    JWT_CONFIRM_EMAIL_LIFETIME: process.env.JWT_CONFIRM_EMAIL_LIFETIME || '24h'
};
