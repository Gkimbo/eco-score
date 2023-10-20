import { useReducer } from 'react';
import { SafeAreaView } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';

import HomePage from './components/HomePage';
import reducer from './services/reducerFunction';
import appStyles from './services/styles/AppStyle';

const Home = () => {
  const [state, dispatch] = useReducer(reducer, {
    carbon: 0,
    greeting: 'Your carbon footprint',
  });
  return (
    <NativeRouter>
      <SafeAreaView style={appStyles.container}>
        <Routes>
          <Route
            path="/"
            element={<HomePage state={state} dispatch={dispatch} />}
          />
        </Routes>
      </SafeAreaView>
    </NativeRouter>
  );
};

export default Home;
