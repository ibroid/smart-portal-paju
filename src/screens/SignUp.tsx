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
	Divider,
	Icon,
	IconButton,
	useColorModeValue,
	Hidden,
	Center,
	StatusBar,
	Box,
	Stack,
	Select,
	useToast,
} from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

import FloatingLabelInput from "../components/FloatingLabelInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IFormSignUp } from "../interfaces/FormInterface"
import { kodeSatker } from "../backend.json";
import { AuthContext } from "../context/AuthContext";
import { AxiosError, AxiosResponse } from "axios";
import { IRegisterResponse } from "../interfaces/ResponseInterface";
import ScreenLoading from "../components/ScreenLoading";
import HttpRequest from "../utility/HttpRequest";
import * as qs from "qs";

function SignUpForm({ props }: any) {

	const { authContext } = React.useContext(AuthContext);
	const toast = useToast();
	const [sudahDaftar, setSudahMendaftar] = useState<boolean>(false);
	const [errMessage, setErrMessage] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false)
	const [showPass, setShowPass] = React.useState(false);
	const [years, setYears] = React.useState<number[]>(() => {
		const date = new Date();
		const arr: number[] = [2023];
		for (let i = 1; i < 7; i++) {
			arr.push(date.getFullYear() - i);
		}
		return arr;
	});

	const [inputNamaLengkap, setInputNamaLengkap] = useState<string>('');
	const [inputNomorTelepon, setInputNomorTelepon] = useState<string>('');
	const [inputPassword, setInputPassword] = useState<string>('');
	const [inputNomorPerkara, setInputNomorPerkara] = useState<string>('');
	const [inputJenisPerkara, setInputJenisPerkara] = useState<string>('');
	const [inputTahunPerkara, setInputTahunPerkara] = useState<string>('');


	const submitForm = () => {
		if (
			!inputNomorTelepon ||
			!inputNamaLengkap ||
			!inputPassword
			// !formValue.nomor_perkara ||
			// !formValue.jenis ||
			// !formValue.tahun
		) {
			// return setErrMessage("Silahkan Lengkapi Form Dibawah ini")
			return toast.show({
				title: 'Peringatan',
				description: 'Silahkan lengkapi form daftar',
				variant: 'solid',
				backgroundColor: 'red.500',
				placement: 'top',
			})
		}

		setLoading(true)
		HttpRequest.setHeaderXForm();
		HttpRequest.request.post('auth/register', qs.stringify({
			phone: inputNomorTelepon,
			password: inputPassword,
			nomor_perkara: `${inputNomorPerkara}/${inputJenisPerkara}/${inputTahunPerkara}/${kodeSatker}`,
			name: inputNamaLengkap
		}))
			.then((res: AxiosResponse<IRegisterResponse>) => {
				Alert.alert('Notifikasi', res.data.message, [
					{
						text: 'Ok !',
						onPress: () => authContext.signUp(res.data.token)
					}
				])
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
					setErrMessage(errMsg);
				}
				Alert.alert('Terjadi Kesalahan .' + err.response?.data.status || err.message, 'Error. ' + err.response?.data.message)
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
								<Text textAlign={'center'} color={'red.500'} bold>{errMessage}</Text>
								<FloatingLabelInput
									isRequired
									label="Nama Lengkap"
									labelColor="#9ca3af"
									labelBGColor={useColorModeValue("#fff", "#1f2937")}
									borderRadius="4"
									defaultValue={inputNamaLengkap}
									onChangeText={(txt: string) => setInputNamaLengkap(txt)}
									_text={{
										fontSize: "sm",
										fontWeight: "medium",
									}}
									_dark={{
										borderColor: "coolGray.700",
									}}
									_light={{
										borderColor: "coolGray.300",
									}}
								/>
								<FloatingLabelInput
									isRequired
									label="Nomor Telepon"
									labelColor="#9ca3af"
									labelBGColor={useColorModeValue("#fff", "#1f2937")}
									borderRadius="4"
									defaultValue={inputNomorTelepon}
									onChangeText={(txt: string) => setInputNomorTelepon(txt)}
									_text={{
										fontSize: "sm",
										fontWeight: "medium",
									}}
									_dark={{
										borderColor: "coolGray.700",
									}}
									_light={{
										borderColor: "coolGray.300",
									}}
								/>
								<FloatingLabelInput
									isRequired
									type={showPass ? "" : "password"}
									label="Password"
									borderRadius="4"
									labelColor="#9ca3af"
									labelBGColor={useColorModeValue("#fff", "#1f2937")}
									defaultValue={inputPassword}
									onChangeText={(txt: string) => setInputPassword(txt)}
									InputRightElement={
										<IconButton
											variant="unstyled"
											icon={
												<Icon
													size="4"
													color="coolGray.400"
													as={Entypo}
													name={showPass ? "eye-with-line" : "eye"}
												/>
											}
											onPress={() => {
												setShowPass(!showPass);
											}}
										/>
									}
									_text={{
										fontSize: "sm",
										fontWeight: "medium",
									}}
									_dark={{
										borderColor: "coolGray.700",
									}}
									_light={{
										borderColor: "coolGray.300",
									}}
								/>
								<Divider />
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
										<FloatingLabelInput
											isRequired
											label="Nomor Perkara"
											borderRadius="4"
											labelColor="#9ca3af"
											labelBGColor={useColorModeValue("#fff", "#1f2937")}
											defaultValue={inputNomorPerkara}
											onChangeText={(txt: string) => setInputNomorPerkara(txt)}
											_text={{
												fontSize: "sm",
												fontWeight: "medium",
											}}
											_dark={{
												borderColor: "coolGray.700",
											}}
											_light={{
												borderColor: "coolGray.300",
											}}
										/>
										<HStack space={6} direction="row">
											<Select w={40}
												selectedValue={inputJenisPerkara}
												accessibilityLabel="Pilih" placeholder="Pilih Jenis Perkara"
												onValueChange={itemValue => setInputJenisPerkara(itemValue)}>
												<Select.Item label="Pdt.G" value="Pdt.G" />
												<Select.Item label="Pdt.P" value="Pdt.P" />
											</Select>

											<Select w={40}
												selectedValue={inputTahunPerkara}
												accessibilityLabel="Pilih" placeholder="Pilih Tahun"
												onValueChange={itemValue => setInputTahunPerkara(itemValue)}>
												{years.map((val) => <Select.Item key={val} label={String(val)} value={String(val)} />)}
											</Select>

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
								onPress={submitForm}
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
