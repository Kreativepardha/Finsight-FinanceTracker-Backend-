# FinSight - Personal Finance Tracker Backend
# STAGE 3 FINISHED 

A robust backend service for the FinSight Personal Finance Tracker application, built with modern technologies and best practices.

## Tech Stack

- **Runtime**: Bun.js (JavaScript runtime)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API Documentation**: Swagger/OpenAPI
- **Validation**: Zod
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate Limiting
- **Development**: TypeScript

## Features Implemented

### Stage 1 - Transaction Management
- ✅ CRUD operations for transactions
- ✅ Transaction listing with filtering
- ✅ Basic form validation
- ✅ Monthly expense tracking

### Stage 2 - Categories & Dashboard
- ✅ Predefined categories (Food, Rent, Travel, etc.)
- ✅ Category-wise expense tracking
- ✅ Budget management per category
- ✅ Monthly budget tracking

## Prerequisites

- Bun.js (latest version)
- Docker and Docker Compose
- PostgreSQL (if running locally without Docker)

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/finsight"
PORT=3000
```

4. Start the database using Docker:
```bash
docker-compose up -d
```

5. Run database migrations:
```bash
bun run prisma:migrate
```

6. Generate Prisma client:
```bash
bun run prisma:generate
```

7. Seed the database (optional):
```bash
bun run seed
```

8. Start the development server:
```bash
bun run dev
```

## API Endpoints

### Transactions

- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create a new transaction
- `GET /api/transactions/:id` - Get a specific transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction

### Budgets

- `GET /api/budgets` - Get all budgets
- `POST /api/budgets` - Create a new budget
- `GET /api/budgets/:id` - Get a specific budget
- `PUT /api/budgets/:id` - Update a budget
- `DELETE /api/budgets/:id` - Delete a budget

## API Documentation

Once the server is running, you can access the Swagger documentation at:
```
http://localhost:3000/api-docs
```

## Development

- The project uses TypeScript for type safety
- ESLint and Prettier are configured for code quality
- Winston is used for logging
- Helmet and CORS are configured for security
- Rate limiting is implemented to prevent abuse

## Testing

To run tests (when implemented):
```bash
bun test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

## API Endpoints with Curl Commands

### Transactions

#### Get All Transactions
```bash
curl -X GET http://localhost:3000/api/transactions
```

#### Create a New Transaction
```bash
curl -X POST http://localhost:5000/api/transactions \
      -H "Content-Type: application/json" \
      -d '{
    "amount": 100.50,
    "description": "Grocery shopping",
    "date": "2024-03-15",
    "category": "Food"
  }'
```

#### Get a Specific Transaction
```bash
curl -X GET http://localhost:5000/api/transactions/e58640c5-7d2a-420a-bfe1-c9b007e1cb54 
```

#### Update a Transaction
```bash
curl -X PUT http://localhost:5000/api/transactions/e58640c5-7d2a-420a-bfe1-c9b007e1cb54 \
                                 -H "Content-Type: application/json" \
                                 -d '{
                               "amount": 150.75,
                               "description": "Updated grocery shopping",
                               "date": "2024-03-15",
                               "category": "Food"
                             }'
```

#### Delete a Transaction
```bash
curl -X DELETE http://localhost:3000/api/transactions/1
```

#### Get Dashboard
```bash
curl -X GET http://localhost:3000/api/transactions/dashboard
```


### Budgets

#### Get All Budgets
```bash
curl -X GET http://localhost:3000/api/budgets
```

#### Create a New Budget
```bash
curl -X POST http://localhost:5000/api/budgets \
                                 -H "Content-Type: application/json" \
                                 -d '{
                               "category": "Food",
                               "amount": 500.00,
                               "month": 3,
                               "year" : 2004
                             }'
```


#### Get All Insights
```bash
curl -X GET http://localhost:3000/api/budgets/insights
```


## Request/Response Examples

### Transaction Response Example
```json
{
  "id": 1,
  "amount": 100.50,
  "description": "Grocery shopping",
  "date": "2024-03-15T00:00:00.000Z",
  "categoryId": 1,
  "createdAt": "2024-03-15T10:00:00.000Z",
  "updatedAt": "2024-03-15T10:00:00.000Z"
}
```

### Budget Response Example
```json
{
  "id": 1,
  "categoryId": 1,
  "amount": 500.00,
  "month": "2024-03",
  "createdAt": "2024-03-15T10:00:00.000Z",
  "updatedAt": "2024-03-15T10:00:00.000Z"
}
```

## Error Handling

The API uses standard HTTP status codes and returns error responses in the following format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  }
}
```

Common error codes:
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error
