/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import { Text, StatusBar, Box } from "native-base";
import * as React from "react";
import { ImageBackground } from "react-native";

export default function HitungBiaya() {


	return (
		<>
			<StatusBar
				translucent
				backgroundColor="transparent"
				barStyle="dark-content"
			/>
			<ImageBackground
				source={require('../assets/images/backgrounds/bg_gradient_blue.png')}
				style={{ flex: 1, marginHorizontal: "auto" }}
			>
				<Box safeArea marginTop={20}>
					<Text>Ini Hitung Biaya</Text>
				</Box>
			</ImageBackground>
		</>
	);
}

