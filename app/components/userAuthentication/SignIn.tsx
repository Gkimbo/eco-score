import { useTheme } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigate } from 'react-router-native';

import LandingPageStyles from '../../services/styles/LandingPageStyle';

const SignIn = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();

  const handlePress = () => {
    navigate('/sign-up');
  };

  return (
    <View style={LandingPageStyles.container}>
      <Text style={LandingPageStyles.header}>Sign in page</Text>
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
            Sign In Here!
          </Text>

          <View style={LandingPageStyles.button}>
            <TouchableOpacity onPress={handlePress}>
              <View style={LandingPageStyles.signIn}>
                <Text style={LandingPageStyles.text}>
                  Dont have and account?
                </Text>
                <Text style={LandingPageStyles.textSign}>Sign Up Here</Text>
                <MaterialIcons name="navigate-next" color="black" size={25} />
              </View>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </View>
  );
};

export default SignIn;
