import { useTheme } from '@react-navigation/native';
import type React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigate } from 'react-router-native';

import LandingPageStyles from '../services/styles/LandingPageStyle';

export interface IAppProps {
  state: any;
  dispatch: any;
}

const LandingPage: React.FunctionComponent<IAppProps> = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();

  const handlePress = () => {
    navigate('/sign-in');
  };

  return (
    <View style={LandingPageStyles.container}>
      <Text style={LandingPageStyles.header}>Landing page</Text>
      <View style={LandingPageStyles.header}>
        <Animatable.View
          style={[
            LandingPageStyles.footer,
            {
              backgroundColor: colors.background,
            },
          ]}
          animation="fadeInUpBig"
        >
          <Text
            style={[
              LandingPageStyles.title,
              {
                color: colors.text,
              },
            ]}
          >
            Whats Your Score?
          </Text>
          <Text style={LandingPageStyles.text}>Sign in with your account</Text>
          <View style={LandingPageStyles.button}>
            <TouchableOpacity onPress={handlePress}>
              <View style={LandingPageStyles.signIn}>
                <Text style={LandingPageStyles.textSign}>Get Started</Text>
                <MaterialIcons name="navigate-next" color="black" size={25} />
              </View>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </View>
  );
};

export default LandingPage;
