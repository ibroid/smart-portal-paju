import { View, Text, Box, Center, Hidden, HStack, Image, Stack, VStack, Heading, ScrollView } from "native-base";
import * as React from "react";
import { SignInForm } from "./SignIn";

export default function Umum() {
	return (
		<>
			<Box
				safeAreaTop
				_light={{ bg: "primary.900" }}
				_dark={{ bg: "coolGray.900" }}
			/>
		</>
	)
}