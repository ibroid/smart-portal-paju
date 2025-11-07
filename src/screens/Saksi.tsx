import * as React from "react";
import { Text, Box, StatusBar, Hidden, Image, Stack, VStack, Pressable, ScrollView, Center, Divider, HStack, Button, IconButton } from "native-base";
import { StackRouterOptions, useFocusEffect } from "@react-navigation/native";
import useHttp from "../hooks/useHttp";
import { IAktaCeraiResponse } from "../interfaces/ResponseInterface";
import { Alert, ImageBackground } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IMainStack, ISaksiStack } from "../interfaces/StackInterface";

import IonIcon from "react-native-vector-icons/Ionicons";

export default function Saksi({ route, navigation }: NativeStackScreenProps<ISaksiStack, "DaftarSaksi">) {

	// const { data, loading, error, errorMessage } = useHttp<IAktaCeraiResponse>('user/akta_cerai');

	// useFocusEffect(React.useCallback(() => {

	// 	if (error && errorMessage) {
	// 		Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini layanan cek biaya tidak bisa diakses. Error : " + errorMessage.message, [
	// 			{
	// 				"text": "Kembali",
	// 				"onPress": () => navigation.goBack()
	// 			}
	// 		])
	// 	}


	// }, [loading]))
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

			<ImageBackground
				source={require('../assets/images/backgrounds/bg_gradient_blue.png')}
				style={{ flex: 1, marginHorizontal: "auto" }}
			>
				<HStack p={3}>
					<IconButton
						p={1}
						borderRadius="full"
						icon={<IonIcon color={"#fff"} size={30} name={"chevron-back"} />}
						_pressed={{
							bg: 'coolGray.800:alpha.20',
							_ios: {
								_icon: {
									size: '2xl'
								}
							}
						}}
						onPress={() => navigation.goBack()}
					/>
				</HStack>
				<Stack
					flexDirection={{ base: "column", md: "row" }}
					w="100%"
					maxW={{ md: "1016px" }}
					flex={{ base: "1", md: "none" }}
				>
					<ScrollView>
						<Box alignItems="center" bgColor={"white"} marginX={3} borderRadius={5} p={2}>
							<VStack>
								<Center>
									<Text bold color={"amber.600"} fontSize={15}>Daftar Saksi</Text>
								</Center>
								<Divider my="2" _light={{
									bg: "muted.800"
								}} _dark={{
									bg: "muted.700"
								}} />
								<Center><Text>Tidak ada data</Text></Center>
							</VStack>
						</Box>
						<Center mt={3}>
							<Button
								onPress={() => navigation.push("TambahSaksi")}
								colorScheme={"success"}>Tambah Saksi</Button>
						</Center>
					</ScrollView>

				</Stack>
			</ImageBackground>
		</>
	)
}