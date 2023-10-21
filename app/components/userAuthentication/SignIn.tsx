import { useTheme } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigate } from 'react-router-native';

import LandingPageStyles from '../../services/styles/LandingPageStyle';
import SignInForm from './forms/SignInForm';

const SignIn = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();

  const handlePress = () => {
    navigate('/sign-up');
  };

  return (
    <View style={LandingPageStyles.container}>
      <View>
        <Text style={LandingPageStyles.header}>Sign in page</Text>
        {/* <Image
          source={require('../../../assets/photo-1542601906990-b4d3fb778b09.png')}
          style={LandingPageStyles.logo}
        /> */}
      </View>
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

          <SignInForm />
          <Text style={LandingPageStyles.text}>Dont have and account?</Text>

          <TouchableOpacity onPress={handlePress}>
            <Text style={LandingPageStyles.textSign}>Sign Up Here</Text>
            <MaterialIcons name="navigate-next" color="black" size={25} />
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </View>
  );
};

export default SignIn;
