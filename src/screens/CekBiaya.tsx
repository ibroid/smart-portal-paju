import React from "react";
import { Text, View, ImageBackground, ScrollView, ActivityIndicator, Alert, FlatList, InteractionManager } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from '@react-navigation/native';
import DefaultHeader from "../components/DefaultHeader";
import Styles from "./screen.style";
import useHttpRequest from "../hooks/useHttpRequest";
import { IKabKotaResponse, IRadiusResponse } from "../interfaces/IResponse";
import { GlobalState } from "../state";
import Modal from "react-native-modal";
import HttpClient from "../service/http";
import { AxiosResponse } from "axios";
import { Button } from "@rneui/themed";
import { defaultBiaya, biaya } from "../data";
import { TokenState } from "../state/token";
import rupiah from "../service/rupiah";
import { AppStackProps } from "../interfaces/IStackParams";

export default function CekBiaya({ navigation }: AppStackProps<"CekBiaya">) {

	const [jenisPerkara, setJenisPerkara] = React.useState<string>('');
	const [kotaP, setKotaP] = React.useState<string>('');
	const [kotaT, setKotaT] = React.useState<string>('');
	const [kelurahanP, setKelurahanP] = React.useState<string>('');
	const [biayaPanggilP, setBiayaPanggilP] = React.useState<string | number>();
	const [kelurahanT, setKelurahanT] = React.useState<string>('');
	const [biayaPanggilT, setBiayaPanggilT] = React.useState<string | number>();
	const [total, setTotal] = React.useState<string>('0');
	const [interactionStatus, setInteractionStatus] = React.useState<boolean>(false);
	const [modal, setModal] = React.useState<boolean>(false);

	const tokenState = TokenState.useState();
	const { data: dataKota, loading, error, errorMessage } = useHttpRequest<IKabKotaResponse[]>('/radius/kabupaten_kota', tokenState.access);

	const [dataKelurahanP, setDataKelurahanP] = React.useState<IRadiusResponse[]>()
	const [dataKelurahanT, setDataKelurahanT] = React.useState<IRadiusResponse[]>()
	const [uraianBiaya, setUraianBiaya] = React.useState<any[]>();

	useFocusEffect(
		React.useCallback(() => {
			if (error && errorMessage) {
				console.log(errorMessage)
				Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini layanan cek biaya tidak bisa diakses. Error : " + errorMessage.message, [
					{
						"text": "Kembali",
						"onPress": () => navigation.goBack()
					}
				])
			}

			if (!loading) {
				InteractionManager.runAfterInteractions(() => {
					setInteractionStatus(true)
				})
			}

			HttpClient.request.defaults.headers.common['Authorization'] = `Bearer ${tokenState.access}`;

			return () => {

				setJenisPerkara('')
				setKotaP('')
				setKotaT('')
				setKelurahanP('')
				setKelurahanT('')
				setBiayaPanggilP('')
				setBiayaPanggilT('')
				setUraianBiaya([])

			};
		}, [loading])
	);

	const CenterLoading = () => {
		return (
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<ActivityIndicator size={'large'} color={'#6a48bd'} />
			</View>
		)
	}

	const changeKotaP = (itemValue: string, itemIndex: number) => {
		setKotaP(itemValue)
		GlobalState.update(index => {
			index.isLoading = true
		})

		HttpClient.request.get(`/radius/${itemValue}`)
			.then((response: AxiosResponse<IRadiusResponse[]>) => {
				setDataKelurahanP(response.data)
				GlobalState.update(index => {
					index.isLoading = false
				})
			})
			.catch(error => {
				console.log(error)
				GlobalState.update(index => {
					index.isLoading = false
				})
			})
	}

	const changeKelurahanP = (itemValue: string, itemIndex: number) => {
		const biaya = (dataKelurahanP) ? dataKelurahanP[itemIndex].biaya : '';
		setKelurahanP(itemValue);
		setBiayaPanggilP(parseFloat(biaya))
	}

	const changeKotaT = (itemValue: string, itemIndex: number) => {
		setKotaT(itemValue)
		GlobalState.update(index => {
			index.isLoading = true
		})
		HttpClient.request.get(`/radius/${itemValue}`)
			.then((response: AxiosResponse<IRadiusResponse[]>) => {
				setDataKelurahanT(response.data)
				GlobalState.update(index => {
					index.isLoading = false
				})
			})
			.catch(error => {
				console.log(error)
				GlobalState.update(index => {
					index.isLoading = false
				})
			})
	}

	const changeKelurahanT = (itemValue: string, itemIndex: number) => {
		const biaya = (dataKelurahanT) ? dataKelurahanT[itemIndex].biaya : '';
		setKelurahanT(itemValue);
		setBiayaPanggilT(parseFloat(biaya))
	}

	const compressBiaya = () => {
		if (Object.prototype.hasOwnProperty.call(biaya, jenisPerkara)) {
			const element = [...defaultBiaya, ...biaya[jenisPerkara]];
			const uraian: any[] = [];
			let totalBiaya: number = 0;
			element.forEach((row: { uraian: string, tarif: any }) => {
				if (typeof row.tarif == 'function') {
					const tarif = parseFloat(row.tarif([biayaPanggilP, kotaP], [biayaPanggilT, kotaT]));
					totalBiaya += tarif;
					uraian.push({ uraian: row.uraian, tarif: tarif });
				} else {
					totalBiaya += parseFloat(row.tarif);
					uraian.push({ uraian: row.uraian, tarif: row.tarif });
				}
			});
			setUraianBiaya(uraian);
			setTotal(rupiah(String(totalBiaya)).replace('Rp. ', ''));
		} else {
			return Alert.alert('Silahkan Pilih Jenis Perkara');
		}

	}

	return (
		<ImageBackground style={Styles.imageBackground} source={require('../assets/images/backgrounds/bg_gradient_blue_3.png')}>
			<DefaultHeader name={'Biaya Panjar'} color={'#fff'} />
			{(!interactionStatus) ? <CenterLoading /> :
				<View style={{ flex: 1 }}>
					<View style={{ alignSelf: 'center', marginVertical: 20, alignItems: 'center', height: 150 }}>
						<Text style={{ color: '#fff' }}>Total Biaya Perkara</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center', }}>
							<Text style={{ color: '#fff', fontWeight: '500', fontSize: 20 }}>Rp.</Text>
							<Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 50 }}>{total}</Text>
						</View>
						<Button
							title="Detail"
							onPress={() => { setModal(true) }}
							buttonStyle={{
								backgroundColor: 'white',
								borderRadius: 20,
								paddingHorizontal: 20,
							}}
							titleStyle={{ color: '#6a48bd' }}
							containerStyle={{
								width: 100,
								marginHorizontal: 50,
								marginVertical: 10,
								alignSelf: 'center'
							}}
							icon={{ name: 'info', type: 'font-awesome', color: '#6a48bd' }}
						/>
					</View>
					<Text style={{ color: '#6a48bd', textAlign: 'center', fontWeight: '700' }}>Periksa Biaya Pendaftaran</Text>
					<ScrollView>
						<View style={{ padding: 10 }}>
							<View style={{ marginBottom: 10, borderBottomWidth: 1, borderColor: '#6a48bd' }}>
								<Text style={{ color: '#000' }}>Pilih Jenis Perkara</Text>
								<Picker mode="dropdown" selectedValue={jenisPerkara} onValueChange={(itemValue, itemindex) => setJenisPerkara(itemValue)} >
									<Picker.Item color='#6a48bd' label="Pilih Jenis Perkara" value="" />
									<Picker.Item color='#6a48bd' label="Cerai Gugat" value="cg" />
									<Picker.Item color='#6a48bd' label="Cerai Talak" value="ct" />
									<Picker.Item color='#6a48bd' label="Isbat Nikah" value="ib" />
									<Picker.Item color='#6a48bd' label="Dispensasi Nikah" value="dn" />
								</Picker>
							</View>
							<View style={{ marginBottom: 10, borderBottomWidth: 1, borderColor: '#6a48bd' }}>
								<Text style={{ color: '#000' }}>Tentukan Domisili Anda</Text>
								<Picker mode="dropdown" selectedValue={kotaP} onValueChange={changeKotaP}>
									<Picker.Item color='#6a48bd' label="Pilih Kota" value="" />
									{dataKota?.map((row, i) => <Picker.Item color='#6a48bd' key={i} label={row.kabupaten_kota} value={row.kode_satker} />
									)}

								</Picker>
								<Picker mode="dropdown" selectedValue={kelurahanP} onValueChange={changeKelurahanP}>
									<Picker.Item color='#6a48bd' label="Pilih Kelurahan" value="" />
									{dataKelurahanP?.map((value, i) => <Picker.Item color='#6a48bd' key={value.id} label={value.kelurahan} value={value.id} />)}
								</Picker>
							</View>

							<View style={{ marginBottom: 10, borderBottomWidth: 1, borderColor: '#6a48bd' }}>
								<Text style={{ color: '#000' }}>Tentukan Domisili Tergugat/Termohon</Text>
								<Picker mode="dropdown" selectedValue={kotaT} onValueChange={changeKotaT}>
									<Picker.Item color='#6a48bd' label="Pilih Kota" value="" />
									{dataKota?.map((row, i) => <Picker.Item color='#6a48bd' key={i} label={row.kabupaten_kota} value={row.kode_satker} />
									)}
								</Picker>
								<Picker mode="dropdown" selectedValue={kelurahanT} onValueChange={changeKelurahanT}>
									<Picker.Item color='#6a48bd' label="Pilih Kelurahan" value="" />
									{dataKelurahanT?.map((value, i) => <Picker.Item color='#6a48bd' key={value.id} label={value.kelurahan} value={value.id} />)}
								</Picker>
							</View>
						</View>
						<Button
							title="PERIKSA"
							onPress={compressBiaya}
							buttonStyle={{
								backgroundColor: '#6a48bd',
								borderWidth: 2,
								borderColor: 'white',
								borderRadius: 30,
							}}
							containerStyle={{
								width: 200,
								marginHorizontal: 50,
								marginVertical: 10,
								alignSelf: 'center'
							}}
							icon={{ name: 'money', type: 'font-awesome', color: 'white' }}
						/>
					</ScrollView>
				</View>
			}
			<Modal onBackdropPress={() => setModal(false)} isVisible={modal}>
				<View style={{ backgroundColor: '#fff', padding: 10, marginTop: 'auto', borderRadius: 10 }}>
					<FlatList data={uraianBiaya} renderItem={({ item }) => <Text>{item.uraian} : {rupiah(String(item.tarif))}</Text>} />
				</View>
			</Modal>
		</ImageBackground>
	);
}