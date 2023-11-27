# Airbnb Clone API

This project implements an API for booking apartments, designed as a simplified Airbnb clone. The technology stack includes **Express.js**, **Sequelize**, **TypeScript**, **Stripe**, **Multer**,  **Pug**

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/alyona-shirpal/airbnb-clone.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd airbnb-clone
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

## Database Setup

Ensure proper database configuration in the `config/sequelize.ts` file. The application uses Sequelize as the ORM for connecting to the database.

## Running the Application

To start the application, run the following command:
``npm run dev``

## Routes
- /users: User-related routes.
- /auth: Authentication routes.
- /apartments: Routes for managing apartments.
- /booking: Routes for handling bookings.
- /payment: Routes related to payments using Stripe.
- /transaction: Routes for managing transactions.

## Documentation
API documentation is available at` /docs`, generated using Swagger. Access it through your browser.
