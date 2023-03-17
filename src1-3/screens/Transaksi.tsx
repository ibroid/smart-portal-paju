import React, { useState, useCallback } from "react";
import {
	View,
	Text,
	ImageBackground,
	FlatList,
	ActivityIndicator,
	InteractionManager,
	TouchableOpacity,
	Alert
} from "react-native";

import Style from "./screen.style";
import DefaultHeader from "../components/DefaultHeader";
import FaIcon from "react-native-vector-icons/FontAwesome5";
import useHttpRequest from "../hooks/useHttpRequest";

import { useFocusEffect } from "@react-navigation/native";
import { ITranasksiResponse } from "../interfaces/IResponse";
import { localDate } from "../service/date";
import { countPemasukan, countPengeluaran, countSisa } from "../service/transaksi";
import { TokenState } from "../state/token";
import { AppStackProps } from "../interfaces/IStackParams";

import rupiah from "../service/rupiah";
import Helper from "../service/helper";
import Modal from "react-native-modal";

export default function Transaksi({ navigation }: AppStackProps<"Transaksi">) {
	const [interactionStatus, setInteractionStatus] = useState<boolean>(false);
	const [transaksi, setTransaksi] = useState<ITranasksiResponse[]>([]);
	const [modal, setModal] = useState<boolean>(false);
	const [keterangan, setKeterangan] = useState<String | null>()
	const [uraian, setUraian] = useState<String | null>()
	const tokenState = TokenState.useState()

	const [totalPengeluaran, setTotalPengeluaran] = useState<number>(0)
	const [totalPemasukan, setTotalPemasukan] = useState<number>(0)
	const [sisa, setSisa] = useState<number>(0)

	const { data, loading, error, errorMessage } = useHttpRequest<ITranasksiResponse[]>('/user/transaksi', tokenState.access);


	useFocusEffect(
		useCallback(() => {
			if (error && errorMessage) {
				console.log(errorMessage)
				Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini layanan transaksi tidak bisa diakses. Error : " + errorMessage.message, [
					{
						"text": "Kembali",
						"onPress": () => navigation.goBack()
					}
				])
			}

			if (data) {

				setTransaksi(data)
				setTotalPemasukan(countPemasukan(data))
				setTotalPengeluaran(countPengeluaran(data))
				setSisa(countSisa(data));
			}

			if (!loading) {
				InteractionManager.runAfterInteractions(() => {
					setInteractionStatus(true)
				})
			}

			return () => {
				setInteractionStatus(false)

			}
		}, [loading]))


	return (
		<ImageBackground style={Style.imageBackground} source={require('../assets/images/backgrounds/bg_gradient_blue_3.png')}>
			<DefaultHeader name="Transaksi" color={'#fff'} />
			{!interactionStatus
				? <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
					<ActivityIndicator size={'large'} color={'#6a48bd'} />
				</View>
				: <View style={{ flex: 1 }}>
					<View style={{ marginLeft: 90, height: 180, marginTop: 10 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: -10 }}>
							<Text style={{ color: '#fff', fontWeight: '600', fontSize: 35 }}>{rupiah(String(totalPemasukan))}</Text>
						</View>
						<Text style={{ color: '#ff5768', fontWeight: '600', fontSize: 35 }}>{rupiah(String(totalPengeluaran))}</Text>
						<View style={{ borderColor: '#fff', borderWidth: 1, marginRight: 80, marginLeft: 50 }} />
						<Text style={{ color: '#fff', fontWeight: '600', fontSize: 35 }}>{rupiah(String(sisa))}</Text>
					</View>
					<Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 15, color: '#6a48bd' }}>Riwayat Transaksi</Text>
					<FlatList
						data={transaksi}
						renderItem={({ item }) => (
							<TouchableOpacity onPress={() => {
								setUraian(item.uraian)
								setKeterangan(item.keterangan)
								setModal(true)
							}} key={item.id} style={{ padding: 10, backgroundColor: '#6a48bd', margin: 10, borderRadius: 10, flexDirection: 'row' }}>
								<View style={{ width: 200, flex: 1 }}>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<FaIcon color={'#fff'} name={(item.jenis_transaksi <= 0) ? 'arrow-up' : 'arrow-down'}></FaIcon>
										<Text style={{ color: '#fff', marginLeft: 10 }}>{Helper.JenisTransaksi(item.jenis_transaksi)}</Text>
									</View>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<FaIcon color={'#fff'} name="calendar"></FaIcon>
										<Text style={{ color: '#fff', marginLeft: 10 }}>{localDate(item.tanggal_transaksi)}</Text>
									</View>
									<Text style={{ color: '#8bd6b6' }}>{Helper.KategoriBiaya(item.kategori_id)}</Text>
								</View>
								<View style={{ padding: 10, borderRadius: 5, alignItems: 'center', flexDirection: 'row' }}>
									<FaIcon name="money-bill-wave-alt" size={15} color={'#fff'}></FaIcon>
									<Text style={{ fontSize: 20, color: '#fff', marginLeft: 5, fontWeight: 'bold' }}>{rupiah(item.jumlah)}</Text>
								</View>
							</TouchableOpacity>
						)} />
				</View>}
			<Modal animationOut={'slideOutDown'} onBackdropPress={() => setModal(false)} animationIn={'slideInUp'} isVisible={modal}>
				<View style={{ backgroundColor: '#fff', padding: 10, marginTop: 'auto', borderRadius: 10 }}>
					<Text>Uraian : {uraian}</Text>
					<Text>Keterangan : {keterangan}</Text>

				</View>
			</Modal>
		</ImageBackground>
	)
}