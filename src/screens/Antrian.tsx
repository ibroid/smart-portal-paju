import { Box, Center, HStack, Text, VStack } from "native-base";
import { ImageBackground, StatusBar } from "react-native";
import { FlatGrid } from "react-native-super-grid";

export default function Antrian() {
	return (
		<>
			<StatusBar
				translucent
				backgroundColor="transparent"
				barStyle="light-content"
			/>
			<Box
				safeAreaTop
				backgroundColor="#694CBD"
			/>
			<ImageBackground source={require('../assets/images/backgrounds/bg_gradient_blue.png')} style={{ flex: 1 }} >
				<VStack space={3}>
					<Center>
						<Text bold color={"#fff"}>Antrian</Text>
					</Center>
					<FlatGrid data={[

					]} renderItem={
						({ }) => (<></>)
					} />
				</VStack>

			</ImageBackground>
		</>
	)
}