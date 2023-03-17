import React, { useEffect, useState } from "react";
import DefaultHeader from "../components/DefaultHeader";
import {
	View,
	Text,
	ImageBackground,
	InteractionManager,
	ActivityIndicator,
	ScrollView,
	Alert
} from "react-native"

import { LocaleConfig, Calendar } from 'react-native-calendars';
import { dateDiff, localDate } from "../service/date";
import { useFocusEffect } from '@react-navigation/native';
import { AppStackProps } from "../interfaces/IStackParams";
import { ISidangResponse } from "../interfaces/IResponse";
import { TokenState } from "../state/token";
import Style from "./screen.style";

import useHttpRequest from "../hooks/useHttpRequest";
import FaIcon from "react-native-vector-icons/FontAwesome5";
import MatIcon from "react-native-vector-icons/MaterialIcons";

export default function JadwalSidang({ navigation }: AppStackProps<"JadwalSidang">) {

	const [interactionStatus, setInteractionStatus] = useState<boolean>(false);
	const tokenState = TokenState.useState();

	const [tglSidang, setTglSidang] = useState<any>({})
	const { data, loading, error, errorMessage } = useHttpRequest<ISidangResponse[]>('/user/jadwal_sidang', tokenState.access);

	useFocusEffect(
		React.useCallback(() => {
			if (error && errorMessage) {
				console.log(errorMessage)
				Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini layanan sidang tidak bisa diakses. Error : " + errorMessage.message, [
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

				const markDate: any = {}
				if (data && !loading) {
					data.forEach(elemenet => {
						markDate[elemenet.tanggal_sidang] = { selected: true, selectedColor: (dateDiff(new Date, elemenet.tanggal_sidang) <= 0) ? '#6a48bd' : "#ff5768" }
					})
					setTglSidang(markDate)
				}
			}

			return () => {
				setInteractionStatus(false)
				setTglSidang({});
			};

		}, [loading])
	)

	LocaleConfig.locales['fr'] = {
		monthNames: [
			'Januari',
			'Februari',
			'Maret',
			'April',
			'Mei',
			'Juni',
			'Juli',
			'Agustus',
			'September',
			'Oktober',
			'November',
			'Desember',
		],
		monthNamesShort: ['Jan', 'Feb', 'Maer', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
		dayNames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu'],
		dayNamesShort: ['Min.', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab.'],
		today: "hari Ini"
	};
	LocaleConfig.defaultLocale = 'fr';

	function HariSidangCard(props: { item: ISidangResponse }) {
		const i = props.item;
		return (
			<View key={i.id} style={{ backgroundColor: '#fff', borderRadius: 10, flexDirection: 'row', marginBottom: 10 }}>
				<View style={{ backgroundColor: (dateDiff(new Date, i.tanggal_sidang) <= 0) ? '#6a48bd' : "#ff5768", width: 10 }}></View>
				<View style={{ padding: 10 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<FaIcon name="calendar" style={{ marginRight: 5 }} />
						<Text>{localDate(i.tanggal_sidang)}</Text>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
						<FaIcon name="clock" style={{ marginRight: 5 }} />
						<Text>09:00 - 10:00 AM</Text>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
						<Text style={{ fontSize: 20, color: 'black', marginBottom: -5 }}>Sidang Ke {i.urutan}</Text>
					</View>
					<Text style={{ fontSize: 15 }}>{i.agenda}</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
						<FaIcon name="building" style={{ marginRight: 5 }} />
						<Text>Ruang Sidang {i.ruangan}</Text>
					</View>
				</View>
			</View>)
	}

	return (
		<ImageBackground style={Style.imageBackground} source={require('../assets/images/backgrounds/bg_gradient_blue_2.png')}>
			<DefaultHeader name="Jadwal Sidang" />
			{(!interactionStatus && loading) ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size={'large'} color={'#fff'} /></View> :
				<ScrollView style={{ flex: 1, flexDirection: 'column' }}>
					<View style={{ paddingHorizontal: 20, marginTop: 20 }}>
						<View style={{ marginBottom: 10 }}>
							<Text style={{ marginLeft: 20, color: '#fff' }}>Hari Ini</Text>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Text style={{ color: '#fff', flex: 1, fontWeight: '600', fontSize: 20, marginLeft: 20 }}>{localDate(new Date)}</Text>
							</View>
						</View>
						<Calendar markedDates={tglSidang} style={{ borderRadius: 20, height: 400 }} />
						<View style={{ flexDirection: 'column', margin: 10 }}>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<MatIcon name="circle" size={30} color="#ff5768" />
								<Text style={{ marginLeft: 10, color: '#fff' }}>Persidangan yang lalu</Text>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<MatIcon name="circle" size={30} color="#6a48bd" />
								<Text style={{ marginLeft: 10, color: '#fff' }}>Persidangan yang akan datang</Text>
							</View>
						</View>
						{data?.map((value) => <HariSidangCard key={value.id} item={value} />)}
					</View>
				</ScrollView>
			}
		</ImageBackground>
	)
}