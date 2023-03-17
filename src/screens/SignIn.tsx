import React, { useState, useContext } from "react";
import {
	Button,
	HStack,
	VStack,
	Text,
	Link,
	Image,
	useColorModeValue,
	IconButton,
	Icon,
	Center,
	Hidden,
	StatusBar,
	Stack,
	Box,
	useToast,
} from "native-base";
import Entypo from "react-native-vector-icons/Entypo";
import FloatingLabelInput from "../components/FloatingLabelInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from "../context/AuthContext";
import QueryString from "qs";
import HttpRequest from "../utility/HttpRequest";
import { AxiosError, AxiosResponse } from "axios";
import { namaSatker } from "../backend.json";
import { Alert, ImageBackground } from "react-native";
import { ILoginResponse } from "../interfaces/ResponseInterface";

export function SignInForm({ props }: any) {
	// add next router here
	const { authContext } = useContext(AuthContext);
	const toast = useToast();
	const [loading, setLoading] = useState<boolean>(false)
	const [errMessage, setErrMessage] = useState<string>('')
	const [formValue, setFormValue] = useState<{
		telepon: string;
		password: string;
	}>({
		telepon: '',
		password: ''
	})

	const [showPass, setShowPass] = React.useState<boolean>(false);

	const submitLogin = () => {
		if (!formValue.telepon || !formValue.password) {
			return toast.show({
				title: 'Peringatan',
				description: 'Silahkan lengkapi form daftar',
				variant: 'solid',
				backgroundColor: 'red.500',
				placement: 'top',
			})
		}
		const body = QueryString.stringify({
			phone: formValue.telepon,
			password: formValue.password
		})
		setErrMessage('')
		setLoading(true)

		HttpRequest.setHeaderXForm().request.post('auth/login', body)
			.then((res: AxiosResponse<ILoginResponse>) => {
				console.log(res.data)
				Alert.alert('Notifikasi', res.data.message, [
					{
						text: 'Ok !',
						onPress: () => authContext.signIn(res.data.token)
					}
				])
			})
			.catch((err: AxiosError<{ status: string, message: string }>) => {
				// console.log(err)
				Alert.alert('Error. ' + err.response?.data.status, 'Terjadi Kesalahan. ' + err.response?.data.message)
				// console.log(err.response?.data)
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
				px="4"
				py="5"
				mx="2"
				maxHeight={400}
				_light={{ bg: "white" }}
				_dark={{ bg: "coolGray.800" }}
				space="3"
				justifyContent="space-between"
				borderTopRightRadius={{ base: "2xl", md: "xl" }}
				borderBottomRightRadius={{ base: "2xl", md: "xl" }}
				borderBottomLeftRadius={{ base: "2xl", md: "xl" }}
				borderTopLeftRadius={{ base: "2xl", md: "0" }}
			>
				<VStack space="2">
					<VStack space={{ base: "5", md: "4" }}>
						<Text textAlign={'center'} color={'red.500'} bold>{errMessage}</Text>
						<FloatingLabelInput
							isRequired
							label="Nomor Telepon"
							labelColor="#9ca3af"
							labelBGColor={useColorModeValue("#fff", "#1f2937")}
							borderRadius="4"
							defaultValue={formValue?.telepon}
							onChangeText={(txt: string) => setFormValue(ress => {
								return { ...ress, telepon: txt }
							})}
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
							defaultValue={formValue?.password}
							onChangeText={(txt: string) => setFormValue(ress => {
								return { ...ress, password: txt }
							})}
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
										setShowPass(true);
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
					</VStack>
					<Link
						ml="auto"
						_text={{
							fontSize: "xs",
							fontWeight: "bold",
							textDecoration: "none",
						}}
						_light={{
							_text: {
								color: "primary.900",
							},
						}}
						_dark={{
							_text: {
								color: "primary.500",
							},
						}}
					>
					</Link>
					<Button
						isLoading={loading}
						isLoadingText="Mohon Tunggu"
						mt="5"
						size="md"
						borderRadius="4"
						_text={{
							fontWeight: "medium",
						}}
						_light={{
							bg: "amber.500",
						}}
						onPress={() => {
							submitLogin();
						}}
					>
						MASUK
					</Button>

				</VStack>
				<HStack
					mb="4"
					space="3"
					safeAreaBottom
					alignItems="center"
					justifyContent="center"
					mt={{ base: "auto", md: "8" }}
				>
					<Text
						_light={{ color: "coolGray.800" }}
						_dark={{ color: "coolGray.400" }}
					>
						Belum punya akun ?
					</Text>
					{/* Opening Link Tag navigateTo:"SignUp" */}
					<Link
						_text={{
							fontWeight: "bold",
							textDecoration: "none",
						}}
						_light={{
							_text: {
								color: "amber.600",
							},
						}}
						_dark={{
							_text: {
								color: "primary.500",
							},
						}}
						onPress={() => {
							props.navigation.navigate("Daftar");
						}}
					>
						Daftar Disini
					</Link>
					{/* Closing Link Tag */}
				</HStack>
			</VStack>
		</KeyboardAwareScrollView>
	);
}
export default function SignIn(props: any) {
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
					py={3}
				>
					<Image resizeMode={"center"} height={150} source={require('../assets/images/logo/paju_putih.png')} alt="logo_putih" />
					<Hidden from="md">
						<Center px="4" mt="4" mb="5" >
							<VStack>
								<Text color={"light.100"} fontSize={"md"} textAlign={'center'}>Selamat Datang di Smart Portal</Text>
								<Text color="coolGray.50" fontSize="lg">
									{namaSatker}
								</Text>

							</VStack>
						</Center>
					</Hidden>
					<SignInForm props={props} />
				</Stack>
			</ImageBackground>
		</>
	);
}
