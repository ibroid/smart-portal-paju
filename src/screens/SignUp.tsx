import React, { useState } from "react";
import { Alert, ImageBackground, InteractionManager, View } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import {
	Button,
	Checkbox,
	Image,
	HStack,
	VStack,
	Text,
	Link,
	Icon,
	IconButton,
	Hidden,
	Center,
	StatusBar,
	Box,
	Stack,
	Select,
	Input,
	useToast,
} from "native-base";

import AntDesign from "react-native-vector-icons/AntDesign";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { kodeSatker } from "../backend.json";
import { AuthContext } from "../context/AuthContext";
import { AxiosError, AxiosResponse } from "axios";
import { IRegisterResponse } from "../interfaces/ResponseInterface";
import ScreenLoading from "../components/ScreenLoading";
import HttpRequest from "../utility/HttpRequest";
import * as qs from "qs";
import { useForm } from "react-hook-form";
import InputDefault from "../components/InputDefault";
import SelectDefault from "../components/SelectDefault";



function SignUpForm({ props }: any) {

	const { authContext } = React.useContext(AuthContext);
	const toast = useToast();
	const [sudahDaftar, setSudahMendaftar] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const [years, setYears] = React.useState<any[]>(() => {
		const date = new Date();
		const arr: any[] = [{
			name: '2023',
			value: '2023'
		}];
		for (let i = 1; i < 7; i++) {
			arr.push({
				value: `${date.getFullYear() - i}`,
				name: `${date.getFullYear() - i}`
			});
		}
		return arr;
	});

	const { handleSubmit, control } = useForm();

	const submitForm = (data: any) => {

		setLoading(true)
		HttpRequest.setHeaderXForm();
		HttpRequest.request.post('auth/register', qs.stringify({
			phone: data.nomorTelepon,
			password: data.password,
			nomor_perkara: `${data.nomorPerkara}/${data.jenisPerkara}/${data.tahunPerkara}/${kodeSatker}`,
			name: data.namaLengkap
		}))
			.then((res: AxiosResponse<IRegisterResponse>) => {
				toast.show({
					title: 'Notifikasi',
					description: res.data.message + '. Anda akan diarahkan sebentar lagi.',
					duration: 3000,
					bgColor: "amber.500",
					onCloseComplete() {
						authContext.signUp(res.data.token);
					}
				})
			})
			.catch((err: AxiosError<any>) => {
				let errMsg: string = "";
				if (err.response?.status == 422) {
					if (err.response.data.errors.password) {
						err.response.data.errors.password.forEach((row: string) => {
							errMsg += `${row}, `;
						})
					}
					if (err.response.data.errors.phone) {
						err.response.data.errors.phone.forEach((row: string) => {
							errMsg += `${row}, `;
						})
					}
					if (err.response.data.errors.name) {
						err.response.data.errors.name.forEach((row: string) => {
							errMsg += `${row}, `;
						})
					}
				}
				toast.show({
					title: 'Terjadi Kesalahan',
					description: `${errMsg + err.response?.data.status + err.message + err.response?.data.message}`,
					duration: 3000,
					bgColor: "red.500"
				})

			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<KeyboardAwareScrollView
			contentContainerStyle={{
				flexGrow: 1,
			}}
			style={{ flex: 1 }}
		>
			<VStack
				flex="1"
				px="6"
				py="3"
				_light={{ bg: "white" }}
				_dark={{ bg: "coolGray.800" }}
				justifyContent="space-between"
				space="3"
				borderTopRightRadius={{ base: "2xl", md: "xl" }}
				borderBottomRightRadius={{ base: "0", md: "xl" }}
				borderTopLeftRadius={{ base: "2xl", md: "0" }}
			>
				<VStack space="2">
					<Hidden till="md">
						<Text fontSize="lg" fontWeight="normal">
							Silahkan isi form pendaftaran berikut
						</Text>
					</Hidden>
					<VStack>
						<VStack space="6">
							<VStack space={{ base: "6", md: "4" }}>
								<InputDefault control={control} name={"namaLengkap"} placeholder="Masukan Nama Lengkap" />
								<InputDefault control={control} name={"nomorTelepon"} placeholder="Masukan Nomor Telepon. Contoh  08XXXX" />
								<InputDefault control={control} name={"password"} placeholder="Masukan Nomor Password" isPass={true} />
								<Checkbox
									alignItems="flex-start"
									onChange={(isSelected) => setSudahMendaftar(isSelected)}
									isChecked={sudahDaftar}
									value="demo"
									colorScheme={"warning"}
									accessibilityLabel="Remember me"
								>
									<HStack alignItems="center">
										<Text fontSize="sm" color="coolGray.400" pl="2">
											Saya Sudah Mempunyai{" "}
										</Text>
										<Link
											_text={{
												fontSize: "sm",
												fontWeight: "semibold",
												textDecoration: "none",
											}}
											_light={{
												_text: {
													color: "amber.500",
												},
											}}
											onPress={() => console.log('ok')}
										>
											Nomor Perkara
										</Link>
									</HStack>
								</Checkbox>
								{sudahDaftar ?
									<VStack space={3}>
										<InputDefault placeholder="Masukan Nomor Perkara (Awal nya saja)" name={"nomorPerkara"} control={control} />
										<HStack space={6} direction="row">
											<SelectDefault
												control={control}
												name="jenisPerkara"
												placeholder="Jenis Perkara"
												data={[
													{ name: 'Pdt.P', value: 'Pdt.P' },
													{ name: 'Pdt.G', value: 'Pdt.G' }
												]} />
											<SelectDefault
												control={control}
												name="tahunPerkara"
												placeholder="Tahun Perkara"
												data={years} />
										</HStack>
									</VStack> : <View></View>}

							</VStack>
							<Button
								isLoading={loading}
								isLoadingText="Mohon Tunggu"
								size="md"
								borderRadius="2"
								_text={{
									fontSize: "sm",
									fontWeight: "medium",
								}}
								_light={{
									bg: "amber.500",
								}}
								_dark={{
									bg: "amber.700"
								}}
								onPress={handleSubmit(submitForm, () => {
									toast.show({
										title: 'Terjadi Kesalahan',
										description: 'Silahkan Lengkapi Form',
										duration: 2000,
										bgColor: "red.500"
									})
								})}
							>
								DAFTAR
							</Button>
						</VStack>
					</VStack>
				</VStack>

			</VStack>
		</KeyboardAwareScrollView>
	);
}

export default function SignUp(props: any) {
	const [focus, setFocus] = useState<boolean>(false);

	useFocusEffect(
		React.useCallback(() => {
			InteractionManager.runAfterInteractions(() => {
				setFocus(true)
			})

			return () => {
				setFocus(false)
			}
		}, [])
	)

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
						<VStack px="4" mt="4" mb="5" space="9">
							<HStack space="2" alignItems="center">
								<IconButton
									pl="0"
									variant="unstyled"
									onPress={() => { props.navigation.goBack() }}
									icon={
										<Icon
											size="6"
											as={AntDesign}
											name="arrowleft"
											color="coolGray.50"
										/>
									}
								/>
								<Text color="coolGray.50" fontSize="lg">
									Mendaftar
								</Text>
							</HStack>
							<VStack space="2">
								<Text fontSize="3xl" fontWeight="bold" color="coolGray.50">
									Selamat Datang
								</Text>
								<Text
									fontSize="md"
									fontWeight="normal"
									_dark={{
										color: "coolGray.400",
									}}
									_light={{
										color: "primary.300",
									}}
								>
									Silahkan isi form dibawah ini
								</Text>
							</VStack>
						</VStack>
					</Hidden>
					<Hidden till="md">
						<Center
							flex="1"
							bg="primary.700"
							borderTopLeftRadius={{ base: "0", md: "xl" }}
							borderBottomLeftRadius={{ base: "0", md: "xl" }}
						>
							<Image
								h="24"
								size="80"
								alt="NativeBase Startup+ "
								resizeMode={"contain"}
								source={require("../components/logo.png")}
							/>
						</Center>
					</Hidden>
					{!focus ? <ScreenLoading /> : <SignUpForm props={props} />}
				</Stack>
			</ImageBackground>


		</>
	);
}
