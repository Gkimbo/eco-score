import { useContext } from "react";
import { useTheme } from "@react-navigation/native";
import type React from "react";
import { Image, Text, Pressable, View } from "react-native";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigate } from "react-router-native";
import LandingPageStyles from "../services/styles/LandingPageStyle";
import { AuthContext } from "../services/AuthContext";

const logoImage = require("../assets/landing-photo.png");

export interface IAppProps {
	state: any;
	dispatch: any;
}

const LandingPage: React.FunctionComponent<IAppProps> = () => {
	const { colors } = useTheme();
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

	const handlePress = () => {
		navigate("/sign-in");
	};

	return (
		<View style={LandingPageStyles.container}>
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
						Whats Your Score?
					</Text>
					<Text style={LandingPageStyles.paragraph}>
						Welcome to Eco Score! The first step towards a greener, more
						sustainable future.{` Let's `}track, reduce, and revolutionize our
						world together!
					</Text>
					<Text style={LandingPageStyles.text}>Sign in with your account</Text>
					<View style={LandingPageStyles.button}>
						<Pressable onPress={handlePress}>
							<View style={LandingPageStyles.signIn}>
								<Text style={LandingPageStyles.textSign}>Get Started</Text>
								<MaterialIcons name="navigate-next" color="black" size={25} />
							</View>
						</Pressable>
					</View>
				</Animatable.View>
			</View>
		</View>
	);
};

export default LandingPage;
