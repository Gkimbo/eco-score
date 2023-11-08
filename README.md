<div align="center">

# Eco Score![NPM version](https://img.shields.io/badge/npm-v16.18.0-blue)

Eco Score is a React Native application that empowers users to calculate and reduce their personal carbon footprint. The app offers personalized recommendations to lower environmental impact, while fostering social engagement by enabling users to compete with friends and family for the highest eco score and rewards.

</div>
<div align="left">

- [🌱 Install](#-install)
- [🌴 Technologies](#-technologies)

## 🌱 Install

Prerequisites

1. Install <a href="https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup">Git</a> if you don't already have it.

2. Install <a href="https://www.postgresql.org/download/" >PostGreSQL</a>

3. Use Git to clone the repository

```bash
git clone https://github.com/Gkimbo/eco-score.git
```

4. Run npm install

```bash
cd eco-score
npm install
```

5. Create database with

```bash
createdb eco-score_development
```

6. Run migration with

```bash
npx sequelize-cli db:migrate
```

NOTE: if you ever need to rollback the DB you can do so with

```bash
npx sequelize-cli db:migrate:undo

```

7. Create a `.env` file in the server of your project:
   Run in the terminal

```bash
cd server
touch .env
```

8. Copy the keys from the .env.example file into it and add your own api keys.

9. Once you're done all that its time to launch the app

```bash
cd client
npm start
w
```

Then in a different terminal tab

```bash
cd server
npm start
```

10. Finally navigate to http://localhost:3000 in your browser and make sure you're all set!

## 🌴 Technologies

React Native, TypeScript , Node.js , Express , PostgreSQL , Sequelize , React Native Paper.

If you would like to contribute to this code base:

Follow the 'Install' instructions to clone the repository from GitHub.
To prevent unwanted modifications of the application:
Create a new git branch to refactor existing features, or implement any new features.
Send pull request for review and consideration of merging the new features into the main application branch.

</div>
