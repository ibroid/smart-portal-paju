import React, { useState, useContext } from "react";
import {
	Button,
	HStack,
	VStack,
	Text,
	Link,
	Image,
	Center,
	Hidden,
	StatusBar,
	Stack,
	Box,
	useToast,
} from "native-base";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from "../context/AuthContext";
import QueryString from "qs";
import HttpRequest from "../utility/HttpRequest";
import { AxiosError, AxiosResponse } from "axios";
import { namaSatker } from "../backend.json";
import { Alert, ImageBackground } from "react-native";
import { ILoginResponse } from "../interfaces/ResponseInterface";
import { useForm } from "react-hook-form";
import InputDefault from "../components/InputDefault";
import { IFormSignIn } from "../interfaces/FormInterface"

export function SignInForm({ props }: any) {

	const { handleSubmit, control } = useForm<IFormSignIn>()
	const { authContext } = useContext(AuthContext);
	const toast = useToast();
	const [loading, setLoading] = useState<boolean>(false);

	const submitLogin = (data: any) => {

		const body = QueryString.stringify({
			phone: data.nomorTelepon,
			password: data.password
		})

		setLoading(true)

		HttpRequest.setHeaderXForm().request.post('auth/login', body)
			.then((res: AxiosResponse<ILoginResponse>) => {
				toast.show({
					title: 'Notifikasi',
					bgColor: 'success.400',
					description: res.data.message + '. Anda akan di arahkan sebentar lagi.',
					duration: 2000,
					onCloseComplete() {
						authContext.signIn(res.data.token)
					},
				})
			})
			.catch((err: AxiosError<{ status: string, message: string }>) => {

				toast.show({
					title: 'Terjadi Kesalahan',
					bgColor: 'red.500',
					description: err.response?.data.message,
					duration: 2000
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
						<InputDefault placeholder="Masukan Nomor Telepon" controllerProp={{
							name: "nomorTelepon",
							control: control
						}} isPass={false} />
						<InputDefault placeholder="Masukan Password" isPass={true} controllerProp={{
							name: "password",
							control: control
						}} />
					</VStack>
					<Button
						onPress={handleSubmit(submitLogin, () => {
							toast.show({
								title: 'Terjadi Kesalahan',
								description: 'Silahkan Lengkapi Form',
								duration: 2000,
								bgColor: "red.500"
							})
						})}
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
