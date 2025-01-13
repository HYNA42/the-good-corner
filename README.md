# The Good Corner

The Good Corner (TGC) is a full-stack application for creating and managing classified ads. It includes a backend built with Node.js, TypeGraphQL, and PostgreSQL, and a frontend built with React and TypeScript.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
- [Services Description](#services-description)
- [Signature](#signature)

---

## Project Overview

The Good Corner allows users to browse, create, and manage classified ads for various categories. The backend handles authentication, ad management, and database operations, while the frontend provides a user-friendly interface.

---

## Technologies Used

- **Backend**: Node.js, TypeGraphQL, TypeORM, PostgreSQL, Docker
- **Frontend**: React, TypeScript
- **Other Tools**:
  - Docker Compose for container orchestration
  - Adminer for database management
  - Nginx as an API gateway

---

## Setup Instructions

### Prerequisites

- Docker and Docker Compose installed on your machine.

### Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/HYNA42/the-good-corner.git
   cd the-good-corner
   ```
2. Start all services:
   ```bash
   docker-compose up --build
   ```
3. The following services will be accessible:
   - Backend: `http://localhost:7000/api`
   - Frontend: `http://localhost:7000/`
   - Adminer: `http://localhost:7000/adminer`

### Environment Variables

Create a `.env` file at the root of the project. Example:

```env
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=the_good_corner
GRAPHQL_URL=http://localhost:4000
```

---

## Usage

1. Open the frontend application in your browser (`http://localhost:7000`).
2. Use the UI to create, view, and manage ads across various categories.
3. Use Adminer (`http://localhost:7000/adminer`) to directly interact with the database if needed.

---

## Services Description

### Backend
- Handles authentication, user registration, and CRUD operations for ads, categories, and tags.
- Accessible at `http://localhost:7000/api`.

### Frontend
- A React application that provides an intuitive interface for browsing and managing ads.
- Accessible at `http://localhost:7000/`.

### Database
- PostgreSQL database to store ads, users, categories, and tags.
- Managed using Adminer.


---

## Signature

hyna:since 23.october/2024



