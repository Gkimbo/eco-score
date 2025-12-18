<div align="center">

# Eco Score

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React Native](https://img.shields.io/badge/React_Native-0.76-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-52-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Calculate, reduce, and compete on your personal carbon footprint**

Eco Score is a React Native application that empowers users to calculate and reduce their personal carbon footprint. Get personalized recommendations to lower your environmental impact while competing with friends and family for the highest eco score and rewards.

[Getting Started](#-getting-started) •
[Features](#-features) •
[Tech Stack](#-tech-stack) •
[Project Structure](#-project-structure) •
[Contributing](#-contributing)

</div>

---

## Features

- **Carbon Footprint Calculator** - Track emissions from vehicles, home energy, and daily activities
- **Personalized Recommendations** - Get actionable tips to reduce your environmental impact
- **Social Competition** - Compete with friends and family for the best eco score
- **Rewards System** - Earn rewards for sustainable choices
- **Cross-Platform** - Works on iOS, Android, and Web

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20.x or higher
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optional, for mobile development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Gkimbo/eco-score.git
   cd eco-score
   ```

2. **Install all dependencies**

   ```bash
   npm run install:all
   ```

3. **Set up the database**

   ```bash
   createdb eco-score_development
   cd server
   npx sequelize-cli db:migrate
   ```

4. **Configure environment variables**

   ```bash
   cd server
   cp .env.example .env
   ```

   Edit `.env` and add your API keys and configuration.

5. **Start the application**

   ```bash
   # From the root directory - starts both client and server
   npm start
   ```

   Or run them separately:

   ```bash
   # Terminal 1 - Server
   npm run server

   # Terminal 2 - Client
   npm run client
   ```

6. **Access the application**

   | Platform | URL |
   |----------|-----|
   | Web | http://localhost:8081 |
   | API | http://localhost:3000 |
   | iOS Simulator | Press `i` in Expo terminal |
   | Android Emulator | Press `a` in Expo terminal |

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React Native, Expo, TypeScript, React Navigation, React Native Paper |
| **Backend** | Node.js, Express, Passport.js |
| **Database** | PostgreSQL, Sequelize ORM |
| **Testing** | Jest, React Testing Library, Supertest |

---

## Project Structure

```
eco-score/
├── client/                 # React Native mobile app
│   ├── components/         # UI components
│   ├── services/           # API calls, utilities, styles
│   ├── assets/             # Images, fonts
│   └── __tests__/          # Frontend tests
│
├── server/                 # Express.js API server
│   ├── routes/             # API endpoints
│   ├── models/             # Sequelize models
│   ├── migrations/         # Database migrations
│   ├── services/           # Business logic
│   └── __tests__/          # Backend tests
│
└── package.json            # Root scripts for running both
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start both client and server concurrently |
| `npm run client` | Start only the Expo client |
| `npm run server` | Start only the Express server |
| `npm run ios` | Start the app on iOS simulator |
| `npm run android` | Start the app on Android emulator |
| `npm run web` | Start the app in web browser |
| `npm run install:all` | Install dependencies for all packages |

---

## Database Management

```bash
# Run migrations
cd server && npx sequelize-cli db:migrate

# Rollback last migration
cd server && npx sequelize-cli db:migrate:undo

# Rollback all migrations
cd server && npx sequelize-cli db:migrate:undo:all
```

---

## Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with :seedling: for a greener planet

</div>
