import { Stack } from 'expo-router';

import HomePage from './components/HomePage';

const Home = () => {
  const greeting = 'Hello from Home Page component';
  return (
    <>
      <Stack.Screen
        options={{
          title: 'My home',
        }}
      />
      <HomePage greeting={greeting} />
    </>
  );
};

export default Home;
