import type React from 'react';
import { Text } from 'react-native';

export interface IAppProps {
  greeting: string;
}

const HomePage: React.FunctionComponent<IAppProps> = ({ greeting }) => {
  return <Text>{greeting}</Text>;
};

export default HomePage;
