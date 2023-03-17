import { Text, Box, Center, Stack, VStack, Select, CheckIcon, Divider, Button, Input, Spacer, Actionsheet, ScrollView, StatusBar } from "native-base";
import * as React from "react";
import { Alert, ImageBackground, View } from "react-native";
import HttpRequest from "../utility/HttpRequest";
import { AuthContext } from "../context/AuthContext";
import { AxiosResponse } from "axios";
import QueryString from "qs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IRadiusResponse } from "../interfaces/ResponseInterface";
import { defaultBiaya, biaya } from "../utility/Panjar";
import Rupiah from "../utility/Rupiah";

export default function HitungBiaya({ props }: any) {
	const { state } = React.useContext(AuthContext);

	interface ResKabKota {
		kabupaten_kota: string;
		kode_satker: number
	}
	interface Alamat { kabKota: ResKabKota, radius: IRadiusResponse };

	const radiusPlate: IRadiusResponse = {
		id: 0,
		nama_satker: "",
		kode_satker: 0,
		kode_provinsi: 0,
		nama_provinsi: "",
		kabupaten_kota: "",
		kecamatan: "",
		kelurahan: "",
		nomor_radius: 0,
		biaya: "",
		created_at: new Date,
		updated_at: new Date
	}

	const btnLoadingPlate: boolean[] = [false, false, false, false, false, false];
	const alamatPLate = {
		kabKota: {
			kabupaten_kota: "",
			kode_satker: 0
		},
		radius: radiusPlate
	}

	const [buttonLoading, setButtonLoading] = React.useState<boolean[]>(btnLoadingPlate);
	const [jenisPerkara, setJenisPerkara] = React.useState<string>("")
	const [modal, setModal] = React.useState<{ p: boolean, t: boolean, d: boolean }>({ p: false, t: false, d: false });
	const [keyKabKota, setKeyKabKota] = React.useState<{ p: string, t: string }>({ p: "", t: "" });
	const [keyKelurahan, setKeyKelurahan] = React.useState<{ p: string, t: string }>({ p: "", t: "" });
	const [kabkota, setKabkota] = React.useState<ResKabKota[]>([]);
	const [kelurahan, setKelurahan] = React.useState<IRadiusResponse[]>([]);
	const [uraianBiaya, setUraianBiaya] = React.useState<any[]>();
	const [total, setTotal] = React.useState<number>(0);

	const [alamat, setAlamat] = React.useState<{ p: Alamat, t: Alamat }>({
		p: alamatPLate,
		t: alamatPLate,
	});


	const cariKabKota = (pos: "p" | "t", btn: 0 | 1 | 2 | 3): void => {
		if (keyKabKota[pos] == "") {
			return Alert.alert("Kolom kabupaten kota masih kosong")
		}
		setButtonLoading(ress => {
			ress[btn] = true;
			return [...ress];
		})
		searchWilayah('radius/search', QueryString.stringify({
			key: keyKabKota[pos],
			search: "kabupaten_kota"
		}), (res, err) => {
			if (err) {
				Alert.alert(err)
			}
			setKabkota(res)
			setModal(ress => {
				ress[pos] = true;
				return { ...ress };
			});
			setButtonLoading(btnLoadingPlate);
		})
	}

	const cariKelurahan = (pos: "p" | "t", btn: 0 | 1 | 2 | 3): void => {
		if (keyKelurahan[pos] == "") {
			return Alert.alert("Kolom Kelurahan kota masih kosong")
		}
		setButtonLoading(ress => {
			ress[btn] = true;
			return [...ress];
		})
		searchWilayah('radius/search', QueryString.stringify({
			key: keyKelurahan[pos],
			search: "kelurahan",
			kode_satker: alamat[pos].kabKota.kode_satker
		}), (res, err) => {
			if (err) {
				return Alert.alert("Error : " + err)
			}
			setKelurahan(res)
			setModal(ress => {
				ress[pos] = true;
				return { ...ress };
			});
			setButtonLoading(btnLoadingPlate);
		})
	}

	function searchWilayah<T>(url: string, body: T | any, callback: (res: any, err: any) => void) {
		HttpRequest.setHeaderXForm()
		HttpRequest.setAuthorizationToken(state.userToken || "");

		HttpRequest.request.post(url, body)
			.then((response: AxiosResponse) => {
				callback(response.data, null);
			})
			.catch(err => {
				console.log('Error :' + err)
				callback(null, err);
			})
	}

	const close = () => {
		setModal({ p: false, t: false, d: false })
		setKabkota([])
		setKelurahan([])
	}

	const ShowKabKotaList = () => {
		if (kabkota.length < 1) {
			return <View></View>;
		}
		return <Actionsheet.Content>
			<Text>Pilih Salah Satu</Text>
			<ScrollView width={"sm"}>
				{kabkota.map((row, i) => {
					return <Actionsheet.Item
						key={++i}
						onPress={() => {
							setKeyKabKota(ress => {
								return { ...ress, p: row.kabupaten_kota }
							});
							setAlamat(ress => {
								ress.p = {
									...ress.p,
									kabKota: row,
								};
								return { ...ress }
							})
							close()
						}}>{row.kabupaten_kota}</Actionsheet.Item>
				})}
			</ScrollView>
		</Actionsheet.Content>
	}

	const ShowKabKotaList2 = () => {
		if (kabkota.length < 1) {
			return <View></View>;
		}
		return <Actionsheet.Content>
			<Text>Pilih Salah Satu</Text>
			<ScrollView width={"sm"}>
				{kabkota.map((row, i) => {
					return <Actionsheet.Item
						key={++i}
						onPress={() => {
							setKeyKabKota(ress => {
								return { ...ress, t: row.kabupaten_kota }
							});
							setAlamat(ress => {
								ress.t = {
									...ress.t,
									kabKota: row,
								};
								return { ...ress }
							})
							close()
						}}>{row.kabupaten_kota}</Actionsheet.Item>
				})}
			</ScrollView>
		</Actionsheet.Content>
	}

	const ShowKelurahanList = () => {
		if (kelurahan.length < 1) {
			return <View></View>;
		}
		return <Actionsheet.Content>
			<Text>Pilih Salah Satu</Text>
			<ScrollView width={"sm"}>
				{kelurahan.map((row, i) => {
					return <Actionsheet.Item
						key={++i}
						onPress={() => {
							setKeyKelurahan(ress => {
								return { ...ress, p: row.kelurahan }
							});
							setAlamat(ress => {
								ress.p = {
									...ress.p,
									radius: row
								};
								return { ...ress }
							})
							close()
						}}>{row.kelurahan}</Actionsheet.Item>
				})}
			</ScrollView>
		</Actionsheet.Content>
	}

	const ShowKelurahanList2 = () => {
		if (kelurahan.length < 1) {
			return <View></View>;
		}
		return <Actionsheet.Content>
			<Text>Pilih Salah Satu</Text>
			<ScrollView width={"sm"}>
				{kelurahan.map((row, i) => {
					return <Actionsheet.Item
						key={++i}
						onPress={() => {
							setKeyKelurahan(ress => {
								return { ...ress, t: row.kelurahan }
							});
							setAlamat(ress => {
								ress.t = {
									...ress.t,
									radius: row
								};
								return { ...ress }
							})
							close()
						}}>{row.kelurahan}</Actionsheet.Item>
				})}
			</ScrollView>
		</Actionsheet.Content>
	}

	const hitungBiaya = () => {
		if (
			jenisPerkara == "" ||
			alamat.p.kabKota.kode_satker == 0 ||
			alamat.p.radius.biaya == "" ||
			alamat.t.kabKota.kode_satker == 0 ||
			alamat.t.radius.biaya == ""
		) {
			return Alert.alert("Silahkan Lengkapi Form")
		}

		setButtonLoading(ress => {
			ress[4] = true;
			return [...ress];
		})

		const selectedBiaya = [...defaultBiaya, ...biaya[jenisPerkara]];
		const uraian: any[] = [];
		let totalBiaya: number = 0;

		selectedBiaya.forEach((row, i) => {
			if (typeof row.tarif == 'function') {
				const tarif = parseFloat(row.tarif(
					[alamat.p.radius.biaya, alamat.p.kabKota.kode_satker],
					[alamat.t.radius.biaya, alamat.t.kabKota.kode_satker]
				));
				totalBiaya += tarif;
				uraian.push({ uraian: row.uraian, tarif: tarif });
			} else {
				totalBiaya += parseFloat(row.tarif);
				uraian.push({ uraian: row.uraian, tarif: row.tarif });
			}

			setUraianBiaya(uraian);
			setTotal(totalBiaya);
		})

		setButtonLoading(btnLoadingPlate);
	}

	return (
		<>
			<StatusBar
				translucent
				backgroundColor="transparent"
				barStyle="dark-content"
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
					<VStack space="2" alignItems="center" m={2}>
						<Text color="coolGray.50" fontSize="lg">
							Berikut Adalah Alur Pendaftaran Perkara di Pengadilan Agama Cianjur Kelas 1A
						</Text>
						<Text color="coolGray.50" fontSize="3xl" bold>
							Rp. {total}
						</Text>
					</VStack>
					<KeyboardAwareScrollView
						contentContainerStyle={{
							flexGrow: 1,
						}}
						style={{ flex: 1 }}>
						<VStack
							flex="1"
							px="4"
							py="6"
							space={5}
							_light={{ bg: "white" }}
							_dark={{ bg: "coolGray.800" }}
							borderTopRightRadius={{ base: "2xl", md: "xl" }}
							borderBottomRightRadius={{ base: "0", md: "xl" }}
							borderTopLeftRadius={{ base: "2xl", md: "0" }}
						>
							<Box maxW="400">
								<Text>Jenis Perkara</Text>
								<Select selectedValue={jenisPerkara} minWidth="200" accessibilityLabel="Pilih Jenis Perkara" placeholder="Pilih Jenis Perkara" _selectedItem={{
									bg: "teal.600",
									endIcon: <CheckIcon size="5" />
								}} mt={1} onValueChange={itemValue => setJenisPerkara(itemValue)}>
									<Select.Item label="Cerai Gugat" value="cg" />
									<Select.Item label="Cerai Talak" value="ct" />
									<Select.Item label="Dispensasi Nikah" value="dn" />
									<Select.Item label="Isbat Nikah" value="ib" />
								</Select>
							</Box>

							{/* FORM  PENGGUGAT */}
							<Box maxW="400">
								<Text>Tentukan Alamat Penggugat/Pemohon</Text>
								<VStack space={2}>
									{/* FORM KAB KOTA PENGGUGAT */}
									<Input
										type={"text"}
										value={keyKabKota.p}
										onChangeText={text => setKeyKabKota(ress => {
											return { ...ress, p: text }
										})}
										w="100%" py="0" size={"md"}
										InputRightElement={<Button size="md"
											isLoading={buttonLoading[0]}
											rounded="none"
											w="1/6"
											h="full"
											onPress={() => cariKabKota("p", 0)} >
											Cari
										</Button>} placeholder="Tulis Kabupaten Kota Anda" />

									{/* FORM KELURAHAN PENGGUGAT */}
									<Input
										type={"text"}
										value={keyKelurahan.p}
										onChangeText={text => setKeyKelurahan(ress => {
											return { ...ress, p: text }
										})}
										w="100%" py="0" size={"md"}
										InputRightElement={<Button size="md"
											isLoading={buttonLoading[1]}
											rounded="none"
											w="1/6"
											h="full"
											onPress={() => cariKelurahan("p", 1)} >
											Cari
										</Button>} placeholder="Tulis Kelurahan Anda" />
								</VStack>

								{/* FORM  TERGUGAT */}
							</Box>
							<Box maxW="400">
								<Text>Tentukan Alamat Tergugat/Termohon</Text>
								<VStack space={2}>
									{/* FORM KAB KOTA TERGUGAT */}
									<Input
										type={"text"}
										value={keyKabKota.t}
										onChangeText={text => setKeyKabKota(ress => {
											return { ...ress, t: text }
										})}
										w="100%" py="0" size={"md"}
										InputRightElement={<Button size="md"
											isLoading={buttonLoading[2]}
											rounded="none"
											w="1/6"
											h="full"
											onPress={() => cariKabKota("t", 2)} >
											Cari
										</Button>} placeholder="Tulis Kabupaten Kota Anda" />

									{/* FORM KELURAHAN TERGUGAT */}
									<Input
										type={"text"}
										value={keyKelurahan.t}
										onChangeText={text => setKeyKelurahan(ress => {
											return { ...ress, t: text }
										})}
										w="100%" py="0" size={"md"}
										InputRightElement={<Button size="md"
											isLoading={buttonLoading[3]}
											rounded="none"
											w="1/6"
											h="full"
											onPress={() => cariKelurahan("t", 3)} >
											Cari
										</Button>} placeholder="Tulis Kelurahan Anda" />
								</VStack>

							</Box>
							<Button
								isLoading={buttonLoading[4]}
								onPress={hitungBiaya}
							>Hitung Biaya</Button>
							{total == 0 ? <View></View> : <Button
								backgroundColor={"amber.600"}
								onPress={() => setModal({ p: false, t: false, d: true })}
							>Lihat Detail Biaya</Button>}

						</VStack>
					</KeyboardAwareScrollView>
				</Stack>
				<Actionsheet isOpen={modal.p} onClose={close}>
					<ShowKabKotaList />
					<ShowKelurahanList />
				</Actionsheet>
				<Actionsheet isOpen={modal.t} onClose={close}>
					<ShowKabKotaList2 />
					<ShowKelurahanList2 />
				</Actionsheet>
				<Actionsheet isOpen={modal.d} onClose={close}>
					<Actionsheet.Content>
						<ScrollView width={"sm"}>
							{total == 0 ? <View></View> :
								uraianBiaya?.map((row, i) => {
									return <Actionsheet.Item key={++i}>{row.uraian + ` ${Rupiah(String(row.tarif))}`}</Actionsheet.Item>
								})
							}
						</ScrollView>
					</Actionsheet.Content>
				</Actionsheet>
			</ImageBackground>
		</>
	)
}

