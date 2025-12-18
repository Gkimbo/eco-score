# Eco Score Client

[![React Native](https://img.shields.io/badge/React_Native-0.76-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-52-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

The mobile client for Eco Score, built with React Native and Expo for cross-platform support on iOS, Android, and Web.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

Then press:
- `i` - Open iOS Simulator
- `a` - Open Android Emulator
- `w` - Open in Web Browser

---

## Project Structure

```
client/
├── components/
│   ├── calculationForms/    # Carbon footprint input forms
│   ├── lists/               # List display components
│   ├── navBar/              # Navigation components
│   ├── rewards/             # Rewards system UI
│   ├── userAuthentication/  # Login/signup forms
│   ├── HomePage.tsx         # Main dashboard
│   └── LandingPage.tsx      # Welcome screen
│
├── services/
│   ├── styles/              # Shared stylesheets
│   ├── config.ts            # API configuration
│   ├── fetchData.tsx        # API request utilities
│   ├── DeleteData.tsx       # Delete operations
│   └── getCurrentUser.tsx   # Auth state management
│
├── assets/                  # Images, icons, fonts
├── __tests__/               # Test files
├── App.tsx                  # App entry point
└── app.json                 # Expo configuration
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run ios` | Run on iOS Simulator |
| `npm run android` | Run on Android Emulator |
| `npm run web` | Run in web browser |
| `npm test` | Run Jest tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `expo` | Development platform and build tools |
| `react-navigation` | Screen navigation |
| `react-native-paper` | Material Design components |
| `axios` | HTTP client for API requests |
| `react-hook-form` | Form state management |
| `lucide-react-native` | Icon library |

---

## Configuration

### API Endpoint

The API base URL is configured in `services/config.ts`:

```typescript
export const API_BASE_URL = 'http://localhost:3000';
```

For production, update this to your deployed server URL.

### App Configuration

Expo settings are in `app.json`:

```json
{
  "expo": {
    "name": "Eco Score",
    "slug": "eco-score",
    "version": "1.0.0"
  }
}
```

---

## Component Architecture

### Navigation Flow

```
LandingPage (Auth)
    ├── Login
    └── Signup
         │
         ▼
    HomePage (Main)
    ├── Dashboard
    ├── Add Car Form
    ├── Add Home Form
    ├── Rewards
    └── Settings
```

### State Management

- **Authentication**: Managed via `getCurrentUser.tsx` with AsyncStorage
- **Forms**: Handled by `react-hook-form` for validation
- **API State**: Direct fetch with loading/error handling in components

---

## Styling

Styles are organized in `services/styles/`:

| File | Purpose |
|------|---------|
| `theme.ts` | Color palette and design tokens |
| `AppStyle.tsx` | Global app styles |
| `FormStyle.tsx` | Form input styles |
| `HomePageStyle.tsx` | Dashboard layout |
| `ListStyles.tsx` | List component styles |

---

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

Tests are located in `__tests__/` and use:
- **Jest** - Test runner
- **React Testing Library** - Component testing

---

## Building for Production

```bash
# Build for all platforms
npx expo export

# Build for specific platform
npx eas build --platform ios
npx eas build --platform android
```

See [Expo Build Documentation](https://docs.expo.dev/build/introduction/) for detailed instructions.

---

## Troubleshooting

### Metro Bundler Issues

```bash
# Clear Metro cache
npx expo start --clear
```

### Dependency Issues

```bash
# Check for issues
npx expo-doctor

# Fix common issues
npx expo install --fix
```

### Watchman Warnings

```bash
watchman watch-del-all
watchman shutdown-server
```

---

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
