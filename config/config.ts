export const config = {
    PORT: process.env.PORT || 5000,
    HOST: process.env.PORT || 'http://localhost',

    JWT_ACCESS_SECRET: process.env.PORT || 'exampleAccessToken',
    ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '10m',

    JWT_REFRESH_SECRET: process.env.PORT || 'exampleRefreshToken',
    REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '1h',

    JWT_PASS_RESET_SECRET: process.env.PORT || 'exampleRestPassword',
    JWT_PASS_RESET_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '24h',
};

