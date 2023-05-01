import { Text, Box, HStack, Hidden, Stack, VStack, ScrollView, Avatar, Divider, Spacer, StatusBar } from "native-base";
import IonIcon from "react-native-vector-icons/Ionicons";
import * as React from 'react';
import { Alert, ImageBackground } from "react-native";
import { IIdentityResponse } from "../interfaces/ResponseInterface";
import useHttp from "../hooks/useHttp";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ScreenLoading from "../components/ScreenLoading";
import { localDate } from "../utility/Dates";
import Helper from "../utility/Helper";

export default function Profil({ props }: any) {

	const { data, error, errorMessage, loading } = useHttp<IIdentityResponse>('/user/pihak');
	const navigation = useNavigation();

	useFocusEffect(React.useCallback(() => {
		console.log(data)
		if (error && errorMessage?.status == 'Error') {
			Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini layanan tidak bisa diakses. Error : " + errorMessage.message, [
				{
					"text": "Kembali",
					"onPress": () => navigation.goBack()
				}
			])
		}
	}, [loading]))

	const CropName = React.useCallback((name: string, jenis_kelamin: string) => {
		name = String(name).toLowerCase();
		const splitName = name.split(jenis_kelamin === 'P' ? 'binti' : 'bin');
		return <>
			<Text fontSize="md" fontWeight="bold" color="coolGray.50">{String(splitName[0]).toUpperCase()}</Text>
			<Text fontSize="md" fontWeight="bold" color="coolGray.50">{jenis_kelamin == 'P' ? 'binti' : 'bin'}{String(splitName[1]).toUpperCase()}</Text>
		</>
	}, [])

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
			<ImageBackground source={require('../assets/images/backgrounds/bg_gradient_blue.png')} style={{ flex: 1 }}>
				<Stack
					flexDirection={{ base: "column", md: "row" }}
					w="100%"
					maxW={{ md: "1016px" }}
					flex={{ base: "1", md: "none" }}
				>
					<Hidden from="md">
						<VStack px="4" mt="12" mb="5" space="2">
							<HStack space="2">
								<Avatar bg="purple.600" alignSelf="center" size="xl" source={require('../assets/images/icon_new_avatar.png')}>
								</Avatar>
								<VStack justifyContent={'center'}>
									{data ? CropName(data?.nama, data?.jenis_kelamin) : ''}
									<Divider />
									<Text fontSize="xl" color="coolGray.50">{data?.nomor_indentitas}</Text>

								</VStack>
							</HStack>
						</VStack>
					</Hidden>

					<VStack
						flex="1"
						px="3"
						py="6"
						_light={{ bg: "white" }}
						_dark={{ bg: "coolGray.800" }}
						justifyContent="space-between"
						space="3"
						borderTopRightRadius={{ base: "2xl", md: "xl" }}
						borderBottomRightRadius={{ base: "0", md: "xl" }}
						borderTopLeftRadius={{ base: "2xl", md: "0" }}
					>
						{loading ? <ScreenLoading /> :
							<ScrollView
								contentContainerStyle={{
									flexGrow: 1,
								}}
								style={{ flex: 1 }}
							>
								<Box borderBottomWidth="1" _dark={{
									borderColor: "muted.50"
								}} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
									<HStack space={[2, 3]} justifyContent="space-between">
										<IonIcon name={'calendar'} size={20} />
										<VStack>
											<Text _dark={{
												color: "warmGray.50"
											}} color="coolGray.800" bold>
												{data?.tempat_lahir + ', ' + localDate(data?.tanggal_lahir)}
											</Text>
											<Text color="coolGray.600" _dark={{
												color: "warmGray.200"
											}}>
												Tempat Tanggal Lahir
											</Text>
										</VStack>
										<Spacer />
									</HStack>
								</Box>
								<Box borderBottomWidth="1" _dark={{
									borderColor: "muted.50"
								}} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
									<HStack space={[2, 3]} justifyContent="space-between">
										<IonIcon name={'calendar'} size={20} />
										<VStack>
											<Text _dark={{
												color: "warmGray.50"
											}} color="coolGray.800" bold>
												{data?.alamat}
											</Text>
											<Text color="coolGray.600" _dark={{
												color: "warmGray.200"
											}}>
												Alamat
											</Text>
										</VStack>
										<Spacer />
									</HStack>
								</Box>
								<Box borderBottomWidth="1" _dark={{
									borderColor: "muted.50"
								}} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
									<HStack space={[2, 3]} justifyContent="space-between">
										<IonIcon name={'calendar'} size={20} />
										<VStack>
											<Text _dark={{
												color: "warmGray.50"
											}} color="coolGray.800" bold>
												{data?.telepon}
											</Text>
											<Text color="coolGray.600" _dark={{
												color: "warmGray.200"
											}}>
												Telepon
											</Text>
										</VStack>
										<Spacer />
									</HStack>
								</Box>
								<Box borderBottomWidth="1" _dark={{
									borderColor: "muted.50"
								}} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
									<HStack space={[2, 3]} justifyContent="space-between">
										<IonIcon name={'calendar'} size={20} />
										<VStack>
											<Text _dark={{
												color: "warmGray.50"
											}} color="coolGray.800" bold>
												{data?.email}
											</Text>
											<Text color="coolGray.600" _dark={{
												color: "warmGray.200"
											}}>
												Email
											</Text>
										</VStack>
										<Spacer />
									</HStack>
								</Box>
								<Box borderBottomWidth="1" _dark={{
									borderColor: "muted.50"
								}} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
									<HStack space={[2, 3]} justifyContent="space-between">
										<IonIcon name={'calendar'} size={20} />
										<VStack>
											<Text _dark={{
												color: "warmGray.50"
											}} color="coolGray.800" bold>
												{Helper.Pendidikan(data?.pendidikan_id)}
											</Text>
											<Text color="coolGray.600" _dark={{
												color: "warmGray.200"
											}}>
												Pendidikan
											</Text>
										</VStack>
										<Spacer />
									</HStack>
								</Box>
								<Box borderBottomWidth="1" _dark={{
									borderColor: "muted.50"
								}} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
									<HStack space={[2, 3]} justifyContent="space-between">
										<IonIcon name={'calendar'} size={20} />
										<VStack>
											<Text _dark={{
												color: "warmGray.50"
											}} color="coolGray.800" bold>
												{data?.pekerjaan}
											</Text>
											<Text color="coolGray.600" _dark={{
												color: "warmGray.200"
											}}>
												Pekerjaan
											</Text>
										</VStack>
										<Spacer />
									</HStack>
								</Box>
								<Box borderBottomWidth="1" _dark={{
									borderColor: "muted.50"
								}} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
									<HStack space={[2, 3]} justifyContent="space-between">
										<IonIcon name={'calendar'} size={20} />
										<VStack>
											<Text _dark={{
												color: "warmGray.50"
											}} color="coolGray.800" bold>
												{Helper.Agama(data?.agama_id)}
											</Text>
											<Text color="coolGray.600" _dark={{
												color: "warmGray.200"
											}}>
												Agama
											</Text>
										</VStack>
										<Spacer />
									</HStack>
								</Box>
								<Divider mt={20} />
							</ScrollView>
						}
					</VStack>
				</Stack>
			</ImageBackground>
		</>
	);
}