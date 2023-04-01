import { Text, Box, HStack, Pressable, Center, Hidden, Stack, VStack, ScrollView, Avatar, Divider, Spacer, Button, Radio, View, Actionsheet, Select, useColorModeValue, StatusBar } from "native-base";
import IonIcon from "react-native-vector-icons/Ionicons";
import * as React from 'react';
import { AuthContext } from "../context/AuthContext";
import HttpRequest from "../utility/HttpRequest";
import { Alert, ImageBackground } from "react-native";
import { AxiosError, AxiosResponse } from "axios";
import { IDataUmumParaPihakResponse, IIdentityResponse } from "../interfaces/ResponseInterface";
import useHttp from "../hooks/useHttp";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import QueryString from "qs";
import ScreenLoading from "../components/ScreenLoading";
import { localDate } from "../utility/Dates";
import Helper from "../utility/Helper";
import FloatingLabelInput from "../components/FloatingLabelInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { kodeSatker } from "../backend.json";
import { emailDeveloper, versiAplikasi, namaAplikasi } from '../backend.json';

export default function Profil({ props }: any) {
	const { state, authContext } = React.useContext(AuthContext);
	const [isOpen, setIsOpen] = React.useState<boolean>(false)
	const [selectedPihak, setSelected] = React.useState<string>('');
	const [errMessage, setErrMessage] = React.useState<string>('');
	const [btnSubmitLoad, setBtnSubmitLoad] = React.useState<boolean>(false);
	const [nomorPerkara, setNomorPerkara] = React.useState<{ nomor: string, jenis: string, tahun: string }>({
		nomor: "",
		jenis: "",
		tahun: ""
	})
	const [years, setYears] = React.useState<number[]>(() => {
		const date = new Date();
		const arr: number[] = [2023];
		for (let i = 1; i < 7; i++) {
			arr.push(date.getFullYear() - i);
		}
		return arr;
	});
	const { data, error, errorMessage, loading } = useHttp<IIdentityResponse>('/user/pihak');
	const navigation = useNavigation();

	useFocusEffect(React.useCallback(() => {
		console.log(data)
		if (error && errorMessage?.status == 'Error') {
			Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini layanan tidak bisa diakses. Error : " + errorMessage.message, [
				{
					"text": "Kembali",
					"onPress": () => navigation.goBack()
				},
				{
					text: "Masukan Nomor",
					onPress: () => setIsOpen(true)
				}
			])
		}
	}, [loading]))

	const close = () => {
		setIsOpen(false);
		navigation.goBack()
	}

	const submitForm = () => {
		if (
			!nomorPerkara.nomor ||
			!nomorPerkara.jenis ||
			!nomorPerkara.tahun
		) {
			return setErrMessage("Silahkan Lengkapi Form Dibawah ini")
		}

		setBtnSubmitLoad(true)
		HttpRequest.setAuthorizationToken(state.userToken || "")
		HttpRequest.setHeaderXForm();
		HttpRequest.request.post('user/perkara', QueryString.stringify({
			nomor_perkara: `${nomorPerkara.nomor}/${nomorPerkara.jenis}/${nomorPerkara.tahun}/${kodeSatker}`,
		}))
			.then((res: AxiosResponse<any>) => {
				Alert.alert('Notifikasi', res.data.message, [
					{
						text: 'Ok !',
						onPress: () => navigation.goBack()
					}
				])
			})
			.catch((err: AxiosError<any>) => {
				Alert.alert(err.response?.data.status || err.message, err.response?.data.message || '')
			})
			.finally(() => {
				setBtnSubmitLoad(false)
			})
	}

	const submitPilihPihak = () => {
		HttpRequest.setAuthorizationToken(state.userToken || "");
		HttpRequest.request.post('user/pihak', QueryString.stringify({ pihak_id: selectedPihak }))
			.then((res: AxiosResponse<{ message: string }>) => {
				Alert.alert('Notifikasi', res.data.message, [
					{
						text: 'Ok',
						onPress: () => navigation.goBack()
					}
				])
			})
			.catch((err: AxiosError<{ status: string, message: string }>) => {
				Alert.alert(err.response?.data.status || err.message, err.response?.data.message || '')
			})
	}

	const submitLogout = () => {
		Alert.alert('Apakah anda akan Logout ?', 'Anda akan keluar dan harus Login Kembali', [
			{
				text: 'Kembali',
				// onPress: () => console.log('kembali')
			},
			{
				text: 'Logout',
				onPress: () => {
					HttpRequest.setAuthorizationToken(state.userToken || "");
					HttpRequest.request.post('auth/logout')
						.then((res: AxiosResponse<{ message: string }>) => {
							Alert.alert('Notifikasi', res.data.message, [
								{
									text: 'Ok',
									onPress: () => authContext.signOut()
								}
							])
						})
						.catch((err: AxiosError<{ status: string, message: string }>) => {
							Alert.alert(err.response?.data.status || err.message, err.response?.data.message || '')
						})
				}
			}
		],
			{
				cancelable: true,
			}
		)
	}

	const CropName = (name: string, jenis_kelamin: string) => {
		name = String(name).toLowerCase();
		const splitName = name.split(jenis_kelamin === 'P' ? 'binti' : 'bin');
		return <>
			<Text fontSize="md" fontWeight="bold" color="coolGray.50">{String(splitName[0]).toUpperCase()}</Text>
			<Text fontSize="md" fontWeight="bold" color="coolGray.50">{jenis_kelamin == 'P' ? 'binti' : 'bin'}{String(splitName[1]).toUpperCase()}</Text>
		</>
	}

	const ShowInfo = () => {
		Alert.alert('Aplikasi ' + namaAplikasi + ' V' + versiAplikasi, 'Apabila anda menemukan kerusakan pada aplikasi silahkan laporkan ke ' + emailDeveloper, [
			{
				text: 'Kembali',
			}
		],
			{
				cancelable: true,
			}
		)
	}

	const SubmitChangePerkara = () => {
		Alert.alert('Apa anda akan mengubah nomor perkara anda ?', 'Apabila anda salah memasukan nomor perkara atau belum mendaftar perkara pada registrasi anda bisa mengubah nomor perkara anda disini', [
			{
				text: 'Kembali',
			},
			{
				text: 'Ganti',
				onPress: () => {
					Alert.alert("Fitur ini akan di tambahkan dalam update mendatang");
				}
			}
		],
			{
				cancelable: true,
			}
		)
	}


	const PilihPihak = () => {
		const { data, error, errorMessage, loading } = useHttp<IDataUmumParaPihakResponse>('/user/para_pihak');

		if (error) {
			return <Text>{'Terjadi Kesalahan. Error :' + errorMessage?.message}</Text>
		}

		return <VStack space={3}>
			<Text>Pilih Salah Satu</Text>
			<Radio.Group onChange={(value) => setSelected(value)} name="myRadioGroup" accessibilityLabel="Pick your favorite number">
				{data?.pihak_satu.map((row, i) => {
					return <Radio key={++i} value={String(row.pihak_id)} my={1}>
						{row.nama}
					</Radio>
				})}
				{data?.pihak_dua.map((row, i) => {
					return <Radio key={++i} value={String(row.pihak_id)} my={1}>
						{row.nama}
					</Radio>
				})}

			</Radio.Group>
			<Button
				onPress={submitPilihPihak}>Pilih Pihak</Button>
		</VStack>;
	}


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
						{loading ? <ScreenLoading /> : data && data.nama
							? <ScrollView
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
												{data.tempat_lahir + ', ' + localDate(data.tanggal_lahir)}
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
												{data.alamat}
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
												{data.telepon}
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
												{data.email}
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
												{Helper.Pendidikan(data.pendidikan_id)}
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
												{data.pekerjaan}
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
												{Helper.Agama(data.agama_id)}
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
							: <PilihPihak />
						}
						<Actionsheet isOpen={isOpen} onClose={close}>
							<Actionsheet.Content height={500}>
								<KeyboardAwareScrollView>
									<VStack space={3} paddingTop={5}>
										<FloatingLabelInput
											isRequired
											label="Nomor Perkara"
											borderRadius="4"
											labelColor="#9ca3af"
											labelBGColor={useColorModeValue("#fff", "#1f2937")}
											defaultValue={nomorPerkara.nomor}
											onChangeText={(txt: string) => setNomorPerkara((ress) => {
												ress.nomor = txt;
												return { ...ress };
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
										<HStack space={6} direction="row">
											<Select w={40}
												selectedValue={nomorPerkara.jenis}
												accessibilityLabel="Pilih" placeholder="Pilih Jenis Perkara"
												onValueChange={itemValue => setNomorPerkara(ress => {
													return { ...ress, jenis: itemValue };
												})}>
												<Select.Item label="Pdt.G" value="Pdt.G" />
												<Select.Item label="Pdt.P" value="Pdt.P" />
											</Select>

											<Select w={40}
												selectedValue={nomorPerkara.tahun}
												accessibilityLabel="Pilih" placeholder="Pilih Tahun"
												onValueChange={itemValue => setNomorPerkara(ress => {
													return { ...ress, tahun: itemValue };
												})}>
												{years.map((val) => <Select.Item key={val} label={String(val)} value={String(val)} />)}
											</Select>

										</HStack>
										<Button
											isLoading={btnSubmitLoad}
											onPress={submitForm}
										>Simpan Nomor Perkara</Button>
									</VStack>
								</KeyboardAwareScrollView>
							</Actionsheet.Content>

						</Actionsheet>
					</VStack>
				</Stack>
			</ImageBackground>
		</>
	);
}