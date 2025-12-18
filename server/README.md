# Eco Score Server

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-52B0E7?logo=sequelize&logoColor=white)](https://sequelize.org/)

RESTful API server for Eco Score, providing authentication, user management, and carbon footprint calculations.

---

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npx sequelize-cli db:migrate

# Start the server
npm start
```

Server runs at http://localhost:3000

---

## Project Structure

```
server/
├── routes/
│   ├── api/v1/              # Versioned API endpoints
│   │   ├── userSessionsRouter.js
│   │   ├── usersRouter.js
│   │   └── userInfoRouter.js
│   ├── rootRouter.js        # Route aggregator
│   └── clientRouter.js      # Static file serving
│
├── models/
│   ├── User.js              # User account model
│   ├── UserCars.js          # Vehicle data model
│   ├── UserHomes.js         # Home energy model
│   └── UserInformation.js   # Profile data model
│
├── migrations/              # Database schema changes
├── serializers/             # Response formatters
├── services/                # Business logic
├── middleware/              # Express middleware
├── config/                  # Database configuration
│
├── app.js                   # Application entry point
├── passport-config.js       # Authentication setup
└── cars.js                  # Vehicle emissions data
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/user-sessions` | Login |
| `DELETE` | `/api/v1/user-sessions` | Logout |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/users` | Get current user |
| `POST` | `/api/v1/users` | Register new user |
| `PUT` | `/api/v1/users/:id` | Update user |
| `DELETE` | `/api/v1/users/:id` | Delete user |

### User Information

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/user-info` | Get user profile data |
| `POST` | `/api/v1/user-info/cars` | Add vehicle |
| `POST` | `/api/v1/user-info/homes` | Add home |
| `PUT` | `/api/v1/user-info/:type/:id` | Update entry |
| `DELETE` | `/api/v1/user-info/:type/:id` | Delete entry |

---

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Database
DATABASE_URL=postgres://user:password@localhost:5432/eco-score_development

# Session
SESSION_SECRET=your-secret-key-here

# Server
PORT=3000
NODE_ENV=development

# Optional
PRODUCTION_URL=https://your-production-url.com
```

---

## Database

### Models

| Model | Description |
|-------|-------------|
| `User` | Account credentials and authentication |
| `UserInformation` | Profile data (name, location, etc.) |
| `UserCars` | Vehicle information for emissions calculation |
| `UserHomes` | Home energy data for footprint tracking |

### Migrations

```bash
# Run all pending migrations
npx sequelize-cli db:migrate

# Rollback last migration
npx sequelize-cli db:migrate:undo

# Rollback all migrations
npx sequelize-cli db:migrate:undo:all

# Create a new migration
npx sequelize-cli migration:generate --name migration-name
```

### Database Setup

```bash
# Create development database
createdb eco-score_development

# Create test database
createdb eco-score_test

# Drop database
dropdb eco-score_development
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start server with nodemon (auto-reload) |
| `npm test` | Run Jest tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |

---

## Authentication

The server uses Passport.js with local strategy for authentication:

- **Session-based** authentication with express-session
- **Password hashing** with bcrypt
- **30-day session** cookie expiration

### CORS Configuration

Allowed origins for cross-origin requests:

- `http://localhost:19006` - Expo web dev
- `http://localhost:8081` - Metro bundler
- `http://localhost:19000` - Expo Go
- `http://localhost:3000` - Local development
- `exp://localhost:8081` - Expo Go on iOS

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `express` | Web framework |
| `sequelize` | ORM for PostgreSQL |
| `passport` | Authentication middleware |
| `passport-local` | Username/password auth strategy |
| `bcrypt` | Password hashing |
| `cors` | Cross-origin resource sharing |
| `dotenv` | Environment variable management |
| `nodemon` | Development auto-reload |
| `cheerio` | HTML parsing for web scraping |

---

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

Tests use:
- **Jest** - Test framework
- **Supertest** - HTTP assertions
- **SQLite** - In-memory test database

---

## Error Handling

API errors return JSON in this format:

```json
{
  "error": "Error message",
  "status": 400
}
```

Common status codes:

| Code | Meaning |
|------|---------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request |
| `401` | Unauthorized |
| `404` | Not Found |
| `500` | Server Error |

---

## Development

### Adding a New Route

1. Create router file in `routes/api/v1/`
2. Add route to `rootRouter.js`
3. Create corresponding model if needed
4. Add serializer for response formatting

### Adding a New Model

```bash
# Generate model and migration
npx sequelize-cli model:generate --name ModelName --attributes field:type
```

---

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure production database URL
3. Set secure `SESSION_SECRET`
4. Enable HTTPS
5. Configure production CORS origins

---

## Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running
pg_isready

# Check connection
psql -d eco-score_development -c "SELECT 1"
```

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

---

## Learn More

- [Express Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/docs/v6/)
- [Passport.js Documentation](http://www.passportjs.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
