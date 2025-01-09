# Telescope Case - Backend

This is the backend for the Telescope case application. It provides a REST API to manage users, portfolios, and properties. The backend is built with Django and uses PostgreSQL as the database, hosted in a Docker container.

## Setup

### Prerequisites

- Docker
- Python 3.8 or later
- Poetry (for dependency management)

### Environment Variables

Create a .env file in the project root with the following structure:

```plaintext
POSTGRES_USER=<your_postgres_user>
POSTGRES_PASSWORD=<your_postgres_password>
POSTGRES_DB=<your_database_name>
POSTGRES_PORT=5432
POSTGRES_HOST=localhost
```

### Database Setup

Start PostgreSQL with Docker: Run the following command to start the PostgreSQL database in a Docker container:

```bash
docker run --name postgres-db \
    -e POSTGRES_USER=<your_postgres_user> \
    -e POSTGRES_PASSWORD=<your_postgres_password> \
    -e POSTGRES_DB=<your_database_name> \
    -p 5432:5432 -d postgres
```

Ensure the database matches the credentials specified in your `.env`-file.

## Application Setup

### Install Dependencies

```bash
poetry install
```

### Run Migrations: Apply database migrations

```bash
python manage.py migrate
```

### Run the Server: Start the development server

```bash
python manage.py runserver
```

API Endpoints
The REST API provides the following endpoints:

- Users: /api/users/
- Portfolios: /api/portfolios/
- Properties: /api/properties/

You can explore the API using a tool like Postman or via the Django admin interface.
