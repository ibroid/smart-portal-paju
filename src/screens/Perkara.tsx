import { View, Text, Badge, Box, Flex, HStack, Pressable, Spacer, Center, Hidden, Image, Stack, VStack, ScrollView, StatusBar, Divider } from "native-base";
import * as React from "react";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import ScreenLoading from "../components/ScreenLoading";
import useHttp from "../hooks/useHttp";
import { IDataUmumResponse } from "../interfaces/ResponseInterface";
import { localDate } from "../utility/Dates";
import { Alert, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function Perkara({ props }: any) {

	const { data, loading, error, errorMessage } = useHttp<IDataUmumResponse>('user/umum');
	const navigation = useNavigation();
	useFocusEffect(React.useCallback(() => {

		if (error && errorMessage) {
			Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini layanan tidak bisa diakses. Error : " + errorMessage.message, [
				{
					"text": "Kembali",
					"onPress": () => navigation.goBack()
				}
			])
		}

	}, [loading]))

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
				<Stack
					flexDirection={{ base: "column", md: "row" }}
					w="100%"
					maxW={{ md: "1016px" }}
					flex={{ base: "1", md: "none" }}
				>
					<Hidden from="md">
						<VStack px="4" mt="12" mb="5" space="2" >
							<VStack space="2" maxW={"80"}>
								<Text fontSize="3xl" fontWeight="bold" color="coolGray.50">
									{data?.nomor_perkara}
								</Text>
								<HStack space={2}>
									<IonIcon name={'md-calendar'} size={20} color={"#FFBF11"} />

									<Text
										fontSize="md"
										fontWeight="normal"
										color={"amber.400"}
									>
										Tanggal Daftar : {localDate(data?.tanggal_pendaftaran)}
									</Text>
								</HStack>
								<HStack space={2}>
									<IonIcon name={'information-circle'} size={20} color="#FFBF00" />

									<Text
										fontSize="md"
										fontWeight="normal"
										color="#FFBF00"
									>
										Jenis Perkara : {data?.jenis_perkara_nama}
									</Text>
								</HStack>
								<HStack space={2}>
									<IonIcon name={'md-calendar-outline'} size={20} color="#FFBF00" />

									<Text
										fontSize="md"
										fontWeight="normal"
										color="#FFBF00"
									>
										Tanggal Menikah : {data?.data_pernikahan?.tgl_nikah}
									</Text>
								</HStack>
								<HStack space={2}>
									<IonIcon name={'ios-document'} size={20} color="#FFBF00" />

									<Text
										fontSize="md"
										fontWeight="normal"
										color="#FFBF00"
									>
										Nomor Akta Nikah : {data?.data_pernikahan?.no_kutipan_akta_nikah}
									</Text>
								</HStack>
								<HStack space={2}>
									<IonIcon name={'md-home'} size={20} color="#FFBF00" />

									<Text
										fontSize="md"
										fontWeight="normal"
										color="#FFBF00"
									>
										KUA Pernikahan : {data?.data_pernikahan?.kua_tempat_nikah}
									</Text>
								</HStack>
							</VStack>
						</VStack>
					</Hidden>
					<ScrollView
						contentContainerStyle={{
							flexGrow: 1,
						}}
						style={{ flex: 1 }}
					>
						<VStack
							flex="1"
							px="6"
							py="6"
							_light={{ bg: "white" }}
							_dark={{ bg: "coolGray.800" }}
							justifyContent="space-between"
							space="3"
							borderTopRightRadius={{ base: "2xl", md: "xl" }}
							borderBottomRightRadius={{ base: "0", md: "xl" }}
							borderTopLeftRadius={{ base: "2xl", md: "0" }}
						>
							{loading ? <ScreenLoading />
								: (data?.tahapan_proses.map((row, i) => (
									<Box key={++i} width={350} p="5" rounded="8" borderWidth="1" borderColor="coolGray.300">
										<HStack alignItems="center">
											<Badge colorScheme="amber" _text={{
												color: "white"
											}} variant="solid" rounded="4">
												{++i}
											</Badge>
											<Spacer />
											<Text fontSize={10} color="coolGray.800">
												{localDate(row.tanggal)}
											</Text>
										</HStack>
										<Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
											{row.proses_nama}
										</Text>
										<Text mt="2" fontSize="sm" color="coolGray.700">
											{row.tahapan_nama} | Keterangan : {row.keterangan}
										</Text>
									</Box>
								)))
							}
						</VStack>
					</ScrollView>
				</Stack>
			</ImageBackground>
		</>
	)
}