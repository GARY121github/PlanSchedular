# PlanSchedular

**PlanSchedular** is a task and project scheduling application built with **Node.js**, **TypeScript**, **Express**, **PostgreSQL**, **Prisma**, and **Zod**. This application allows users to manage and schedule their tasks with varying priorities, ensuring an organized approach to managing plans and projects.

## Features

- Task scheduling with customizable priorities (`high`, `medium`, `low`).
- CRUD operations for managing plans.
- Database integration with **PostgreSQL** using **Prisma** ORM.
- Input validation with **Zod** for better error handling and type safety.
- RESTful API built with **Express**.

## Tech Stack

- **Node.js**: Server-side JavaScript runtime.
- **TypeScript**: JavaScript with types for better code quality and maintainability.
- **Express**: Web framework for building RESTful APIs.
- **PostgreSQL**: Relational database for storing plan data.
- **Prisma**: ORM for managing database schemas and queries.
- **Zod**: Type-safe schema validation for request handling and error prevention.

## Setup & Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Prisma CLI](https://www.prisma.io/docs/getting-started)

### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone git@github.com:GARY121github/PlanSchedular.git
cd PlanSchedular
cp .env.sample .env
npm install
npm generate
npm run start
```