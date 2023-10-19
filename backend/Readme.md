# Food Delivery Project with Express.js, Prisma, and ROSLib

## Overview

This project is a food delivery system built with Express.js as the backend framework, Prisma for database management, and ROSLib for robot control. It enables users to browse restaurant menus, place orders, and allows kitchen staff to manage orders and robots to deliver food to tables.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Prisma Installation](#prisma-installation)
  - [Database Migration](#database-migration)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Robot Control](#robot-control)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you get started, ensure you have the following prerequisites:

- Node.js and npm installed
- PostgreSQL database
- Environment variables set up in a .env file
  - Example .env variables:

    ``` text
    DATABASE_URL="postgresql://your_db_user:your_db_password@localhost:5432/your_db_name"
    SECRET_KEY=your_secret_key
    ROSBRIDGE_URL="ws://localhost:9090"
    ```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/piriyapol/ROS1-food-delivery-web-rai-v1.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ROS1-food-delivery-web-rai-v1
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Prisma Installation

To set up Prisma for your project, follow these steps:

1. Install Prisma CLI (if not already installed):

   ```bash
   npm install -g prisma
   ```

2. Initialize Prisma:

   ```bash
   npx prisma init
   ```

3. Generate Prisma Client:

   ```bash
   npx prisma generate
   ```

### Database Migration

Before you run the project, ensure you've set up your PostgreSQL database and perform the database migration:

```bash
npx prisma migrate dev
```

## Project Structure

The project follows a typical Express.js project structure:

- `controllers/`: Contains controller functions.
- `models/`: Prisma models for database schema.
- `routes/`: Define the API routes.
- `services/`: Business logic.
- `test/`: Unit tests.
- `app.js`: Express application configuration.

## Configuration

Set up your configuration and environment variables in a .env file. Ensure you have a ROSBridge URL set in the .env file, which points to your ROSBridge server. The ROSBridge URL is used for robot control.

## Usage

To run the project, use the following command:

```bash
npm start
```

The server will start on <http://localhost:3000> by default.

## Endpoints

- `/tables`: [GET] Retrieve a list of tables.
- `/tables`: [POST] Create a new table.
- `/orders`: [POST] Create a new order.
- `/orders/:id`: [PUT] Update an order.
- `/robot-control`: [POST] Send robot control commands.

For a complete list of endpoints and request/response examples, refer to the API documentation.

## Robot Control

The project uses ROSLib to send robot control commands to deliver food to tables. The `/robot-control` endpoint allows you to instruct the robot to move to specific tables. The robot's coordinates are stored in the database and sent to the robot using ROSLib.

## Testing

To run tests, use the following command:

```bash
npm test
```

Ensure that the Prisma client is correctly configured to use a test database.

## Contributing

Contributions to this project are welcome! Feel free to submit pull requests and report issues on GitHub.

## License

This project is licensed under the [MIT License](LICENSE).
