import { useEffect, useMemo, useReducer, useState } from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';

import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import SignIn from './components/userAuthentication/SignIn';
import SignUp from './components/userAuthentication/SignUp';
import { AuthContext } from './services/context';
import reducer from './services/reducerFunction';
import appStyles from './services/styles/AppStyle';
import type { AuthContextValue } from './services/types/AuthContextType';

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [state, dispatch] = useReducer(reducer, {
    carbon: 0,
    greeting: 'Your carbon footprint',
  });

  const authContext: AuthContextValue = useMemo(
    () => ({
      signIn: () => {
        setUserToken('afdvwew');
        setIsLoading(false);
      },
      signOut: () => {
        setUserToken(null);
        setIsLoading(false);
      },
      signUp: () => {
        setUserToken('fvercrrvr');
        setIsLoading(false);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NativeRouter>
        <SafeAreaView style={appStyles.container}>
          <Routes>
            {userToken !== null ? (
              <Route
                path="/"
                element={<HomePage state={state} dispatch={dispatch} />}
              />
            ) : (
              <>
                <Route
                  path="/"
                  element={<LandingPage state={state} dispatch={dispatch} />}
                />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
              </>
            )}
          </Routes>
        </SafeAreaView>
      </NativeRouter>
    </AuthContext.Provider>
  );
};

export default Home;
