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
import SignUpForm from "./forms/SignUpForm";

const logoImage = require("../../assets/landing-photo.png");

const SignUp = () => {
	const { colors } = useTheme();
	const navigate = useNavigate();

	const handlePress = () => {
		navigate("/sign-in");
	};

	return (
		<KeyboardAvoidingView
			style={LandingPageStyles.container}
			behavior="padding"
		>
			<Image source={logoImage} style={LandingPageStyles.logoReg} />
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
						Sign Up Here!
					</Text>
					<ScrollView contentContainerStyle={formStyles.container}>
						<SignUpForm />
						<Text style={LandingPageStyles.text}>Already have an Account?</Text>
						<TouchableOpacity onPress={handlePress}>
							<View style={LandingPageStyles.buttonContainer}>
								<Text style={LandingPageStyles.textSign}>Back to sign in</Text>
								<MaterialIcons name="navigate-next" color="black" size={25} />
							</View>
						</TouchableOpacity>
					</ScrollView>
				</Animatable.View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default SignUp;