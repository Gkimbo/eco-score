import { useTheme } from "@react-navigation/native";
import {
	Image,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigate } from "react-router-native";

import formStyles from "../../services/styles/FormStyle";
import LandingPageStyles from "../../services/styles/LandingPageStyle";
import SignInForm from "./forms/SignInForm";

const logoImage = require("../../assets/landing-photo.png");

export interface IAppProps {
	state: any;
	dispatch: any;
}

const SignIn: React.FunctionComponent<IAppProps> = ({ state, dispatch }) => {
	const { colors } = useTheme();
	const navigate = useNavigate();

	const handlePress = () => {
		navigate("/sign-up");
	};

	return (
		<KeyboardAvoidingView
			style={LandingPageStyles.container}
			behavior="padding"
		>
			<Image source={logoImage} style={LandingPageStyles.logo} />
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
					<ScrollView contentContainerStyle={formStyles.container}>
						<SignInForm state={state} dispatch={dispatch} />
						<Text
							style={LandingPageStyles.text}
						>{`Don't have and account?`}</Text>
						<TouchableOpacity onPress={handlePress}>
							<View style={LandingPageStyles.buttonContainer}>
								<Text style={LandingPageStyles.textSign}>Sign Up Here</Text>
								<MaterialIcons name="navigate-next" color="black" size={25} />
							</View>
						</TouchableOpacity>
					</ScrollView>
				</Animatable.View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default SignIn;
