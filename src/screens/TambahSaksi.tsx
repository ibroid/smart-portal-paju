import * as React from "react";
import { Text, Box, StatusBar, Stack, VStack, Center, Divider, HStack, Button, IconButton, useToast } from "native-base";
import { ImageBackground } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ISaksiStack } from "../interfaces/StackInterface";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useForm } from "react-hook-form";
import InputDefault from "../components/InputDefault";
import { ISaksiForm } from "../interfaces/FormInterface";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HttpRequest from '../utility/HttpRequest';
import { AuthContext } from "../context/AuthContext";
import QueryString from "qs";
import { AxiosResponse } from "axios";
import { ISaksiResponse } from "../interfaces/ResponseInterface";
import DatePicker from 'react-native-date-picker'

export default function TambahSaksi({ route, navigation }: NativeStackScreenProps<ISaksiStack, "TambahSaksi">) {

	const { control, handleSubmit } = useForm<ISaksiForm>();
	const { state } = React.useContext(AuthContext);

	const toast = useToast();
	const [modalDate, setModalDate] = React.useState<boolean>(false);
	const [selectedDate, setSelectedDate] = React.useState<Date>(new Date);

	const SaveDataSaksi = React.useCallback((data: ISaksiForm) => {

		const body = QueryString.stringify(data);

		HttpRequest.setHeaderXForm();
		HttpRequest.setAuthorizationToken(state.userToken!);
		HttpRequest.request.post('/saksi', body)
			.then((response: AxiosResponse<ISaksiResponse>) => {

			})
			.catch()


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
					<KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{
						flexGrow: 1,
					}}>
						<Box alignItems="center" bgColor={"white"} marginX={3} borderRadius={5} p={3} >
							<VStack>
								<Center>
									<Text bold color={"amber.600"} fontSize={15}>Form Tambah Saksi</Text>
								</Center>
								<Divider my="2" _light={{
									bg: "muted.800"
								}} _dark={{
									bg: "muted.700"
								}} />
								<InputDefault controllerProp={{
									name: "nama",
									rules: { required: true },
									control: control
								}} isPass={false} placeholder={"Nama Lengkap Saksi"} />
								<InputDefault controllerProp={{
									name: "umur",
									rules: { required: true },
									control: control
								}} isPass={false} placeholder={"Umur Saksi"} />
								<InputDefault controllerProp={{
									name: "nik",
									rules: { required: true },
									control: control
								}} isPass={false} placeholder={"NIK Saksi"} />
								<InputDefault controllerProp={{
									name: "tempatLahir",
									rules: { required: true },
									control: control
								}} isPass={false} placeholder={"Tempat Lahir Saksi"} />

								{/* <InputDefault controllerProp={{
									name: "tanggalLahir",
									rules: { required: true },
									control: control,
								}} isPass={false} placeholder={"Tanggal Lahir Saksi"} /> */}

								<Text color={"gray.500"} mt={3} fontSize={12}>Tanggal Lahir Saksi</Text>

								<Button size={"sm"} width={40} onPress={() => setModalDate(true)}>Pilih Tanggal</Button>

								<DatePicker title={"Pilih Tanggal"} modal open={modalDate} locale={"id"} mode="date" date={selectedDate} onDateChange={(value) => {
									console.log(value)
								}} />
								<InputDefault controllerProp={{
									name: "alamat",
									rules: { required: true },
									control: control
								}} isPass={false} placeholder={"Alamat Lengkap Saksi"} />
								<InputDefault controllerProp={{
									name: "hubungan",
									rules: { required: true },
									control: control
								}} isPass={false} placeholder={"Hubungan Saksi dengan Anda"} />
								<Button
									onPress={handleSubmit(SaveDataSaksi, (errors) => {
										toast.show({
											title: 'Terjadi Kesalahan',
											description: 'Silahkan Lengkapi Form. Error : ' + errors,
											duration: 2000,
											bgColor: "red.500"
										})
									})}
									m={5}
									colorScheme={"amber"}>Simpan Saksi</Button>
							</VStack>
						</Box>
					</KeyboardAwareScrollView>

				</Stack>
			</ImageBackground >
		</>
	)
}
