# ROS1 Food Delivery Web RAI v1

**Mini Delivery Robot Showcase of RAI Students**

The ROS1 Food Delivery Web RAI v1 project is a demonstration of an innovative food delivery system, combining web technologies, robotics, and automation to create an efficient solution for restaurants. This repository is divided into two main parts: the frontend, responsible for user interactions, and the backend, handling data management, robot control, and coordination between the elements.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Prerequisites](#prerequisites-1)
  - [Auto Installations](#auto-installations)
  - [Only Backend](#backend-installation)
  - [Only Frontend](#frontend-installation)
- [Configuration](#configuration)
  - [Backend Configuration](#backend-configuration)
  - [Frontend Configuration](#frontend-configuration)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Robot Control](#robot-control)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you dive into this project, make sure you have the following prerequisites in place:

- Node.js and npm installed
- A PostgreSQL database for backend data storage
- Environment variables configured in respective `.env` files

Example `.env` variables for reference:

**Backend `.env`**:

```plaintext
DATABASE_URL="postgresql://your_db_user:your_db_password@localhost:5432/your_db_name"
ROSBridge_URL="ws://localhost:9090"
```

**Frontend `.env`**:

```plaintext
BACKEND_SOCKET_URL="http://localhost:3000"
BACKEND_API_BASE_URL="http://localhost:3000"
```

## Project Structure

The project is organized with a typical Express.js backend and a React-based frontend. Here's an overview of the directory structure:

- `backend/`: Contains the backend server application.

  - `controllers/`: Controller functions.
  - `models/`: Prisma models for database schema.
  - `routes/`: Defines API routes.
  - `services/`: Business logic.
  - `test/`: Unit tests.
  - `app.js`: Express application configuration.

- `frontend/`: Houses the frontend React application.
  - `public/`: Static assets.
  - `src/`: Source code.
    - `components/`: Reusable UI components.
    - `pages/`: Application pages.
    - `services/`: Frontend services.

## Installation

You'll need to install and configure both the backend and frontend to run the project successfully.
You can install both backend and frontend at the same time or install them separately.

### Auto Installations (Backend and Frontend)

0. Clone this repository:

   ```bash
   git clone https://github.com/piriyapol/ROS1-food-delivery-web-rai-v1.git
   ```

1. Install Prisma CLI (if not already installed):

   ```bash
   npm install -g prisma

   ```

2. Npm Install

   ```bash
   npm install
   ```

3. Install All (Backend, Frontend, Prisma Client)

   ```bash
   npm run install-all
   ```

4. config .env

      ```bash
      DATABASE_URL="postgresql://username:password@localhost:5432/rai_food_delivery_db"
      ROSBridge_URL="ws://localhost:9090"
      BACKEND_API_BASE_URL="http://localhost:3000"
      ```

5. Migration Database and Generate Prisma Client

   ```bash
   npm run prisma-migrate && npm run prisma-generate
   ```

### Backend Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/piriyapol/ROS1-food-delivery-web-rai-v1.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ROS1-food-delivery-web-rai-v1
   ```

3. Install backend dependencies:

   ```bash
   npm install
   ```

4. **Prisma Installation**:

   To set up Prisma, follow these steps:

   - Install Prisma CLI (if not already installed):

     ```bash
     npm install -g prisma
     ```

   - Generate Prisma Client:

     ```bash
     npx prisma generate
     ```

5. **Database Migration**:

   Before running the project, make sure to set up your PostgreSQL database and perform the database migration:

   ```bash
   npm run prisma-migrate
   ```

### Frontend Installation

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

## Configuration

Configuration settings are crucial for the proper functioning of the project. Make sure you have your environment variables set correctly in the respective `.env` files.

### Backend Configuration

Ensure your backend `.env` file is correctly configured with database and ROSBridge URL settings.

Example:

```plaintext
DATABASE_URL="postgresql://username:password@localhost:5432/rai_food_delivery_db"
ROSBridge_URL="ws://localhost:9090"
```

### Frontend Configuration

Your frontend `.env` file should have settings for backend API URLs.

Example:

```plaintext
BACKEND_API_BASE_URL="http://localhost:3000"
```

## Usage

To start the project, run the following command:

```bash
npm start
```

The backend server will be available at `http://localhost:3000`, and the frontend will be accessible at `http://localhost:3030`. The project is now ready for use.

## Endpoints

The project offers several endpoints for managing tables, orders, and robot control.

- `/api/tables`: [GET] Retrieve a list of tables.
- `/api//tables`: [POST] Create a new table.
  <br>
- `/api/menu`: [GET] Retrieve a list of menu items.
- `/api/menu`: [POST] Create a new menu item.
- `/api/menu/:id`: [PUT] Update a menu item.
- `/api/menu/:id`: [DELETE] Delete a menu item.
  <br>
- `/api/orders`: [POST] Create a new order.
- `/api/orders/:id`: [PUT] Update an order.
- `/api/orders/:id`: [DELETE] Delete an order.
  <br>
- `/api/admin/orders`: [GET] Retrieve a list of orders.
- `/api/admin/orders/:id`: [GET] Retrieve an order by ID.
- `/api/admin/orders/:id`: [PUT] Update an order by ID.
- `/api/admin/orders/:id`: [DELETE] Delete an order by ID.
  <br>
- `/api/robot-control`: [POST] Send robot control commands.

For a complete list of endpoints and request/response examples, please refer to the API documentation.

## Robot Control

The heart of this project's innovation is the integration of ROSLib and ROS Bridge, enabling precise robot control. Here's how it works:

### What is ROS Bridge?

ROS Bridge is the communication middleware that connects the web application with ROS. It facilitates real-time interaction between web-based frontend components and ROS nodes.

### ROSLib for Web Communication

ROSLib, a JavaScript library, plays a pivotal role in this project. It establishes the connection between the web application and ROS, making the following functionalities possible:

- **Robot Control**: ROSLib sends precise commands to the delivery robots, guiding them to navigate to specific tables for food delivery.

- **Coordinate Transfer**: The robots' coordinates are stored in the backend's database. ROSLib transfers these coordinates to the robots, ensuring accurate navigation and delivery.

### Sending Robot Control Commands

The `/robot-control` endpoint is the control center for directing the robot's movement. Kitchen staff, for instance, can use this endpoint to specify the destination table for food delivery. ROSLib generates the necessary control message and communicates it to the robot, initiating its journey to the designated table.

### Central to Seamless Food Delivery

ROS Bridge and ROSLib are at the core of this project, ensuring that food delivery in a restaurant environment is both accurate and efficient. It brings together web development, robotics, and automation, creating an interdisciplinary solution to a real-world challenge.

The technology showcased in this project demonstrates the potential of interdisciplinary engineering in addressing complex, practical scenarios. For more technical details about ROS Bridge integration or to explore the robot control logic further, consult the project's source code and documentation.

## Testing

To run tests, execute the following command:

```bash
npm test
```

Make sure that the Prisma client is configured to use a test database for the testing environment.

## Contributing

Contributions to this project are welcome! Whether you want to submit pull requests,

report issues, or collaborate in any way, we encourage you to get involved. This project thrives on collective expertise and enthusiasm.

## License

This project is licensed under the [MIT License](LICENSE). You are encouraged to explore, use, and extend the project in line with the license's terms.

For bug reports, feature requests, or further assistance, please refer to the [project's GitHub issues](https://github.com/piriyapol/ROS1-food-delivery-web-rai-v1/issues).

Thank you for being part of this exciting journey in exploring the possibilities of robotics and web technology in food delivery!

## Contributors
<!-- Table with picture of github and name student id and position in team with table header-->
<!-- Table header in html -->
<table>
  <tr>
    <th>Image</th>
    <th>Student ID</th>
    <th>Name</th>
    <th>Position</th>
  </tr>
   <tr>
      <td><img src="https://avatars.githubusercontent.com/u/29841795?v=4" width="100" height="100"></td>
      <td>64011563</td>
      <td>Piriyapol Prasankliew</td>
      <td>Full Stack</td>
   </tr>
   <tr>
      <td><img src="https://avatars.githubusercontent.com/u/100303442?v=4" width="100" height="100"></td>
      <td>640115xx</td>
      <td>Sharon Seithi</td>
      <td>Full Stack</td>
   </tr>
   <tr>
      <td><img src="https://avatars.githubusercontent.com/u/100303442?v=4" width="100" height="100"></td>
      <td>640115xx</td>
      <td>Team Member</td>
      <td>Full Stack</td>
</table>
