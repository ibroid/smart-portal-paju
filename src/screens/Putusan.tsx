import React, { useState } from "react";

import {
	View,
	Text,
	ImageBackground,
	Image,
	ScrollView,
	InteractionManager,
	ActivityIndicator,
	Alert
} from "react-native";

import DefaultHeader from "../components/DefaultHeader";
import FaIcon from "react-native-vector-icons/FontAwesome5";

import { useFocusEffect } from '@react-navigation/native';
import { IPutusanResponse } from "../interfaces/IResponse";
import { localDate } from "../service/date";
import { TokenState } from "../state/token";
import { AppStackProps } from "../interfaces/IStackParams";

import useHttpRequest from "../hooks/useHttpRequest";
import RenderHtml from 'react-native-render-html';
import Helper from "../service/helper";
import Style from "./screen.style";

export default function Putusan({ navigation }: AppStackProps<"Putusan">) {

	const [interaction, setInteraction] = useState<boolean>(false)
	const [putusan, setPutusan] = useState<IPutusanResponse | null>();
	const [isPutus, setIsPutus] = useState<boolean>(false);
	const tokenState = TokenState.useState();

	const { data, loading, error, errorMessage } = useHttpRequest<IPutusanResponse>('/user/putusan', tokenState.access);

	useFocusEffect(React.useCallback(() => {

		if (error && errorMessage) {
			console.log(errorMessage)
			Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini layanan putusan tidak bisa diakses. Error : " + errorMessage.message, [
				{
					"text": "Kembali",
					"onPress": () => navigation.goBack()
				}
			])
		}

		if (data?.tanggal_putusan) {
			setIsPutus(true)
			setPutusan(data)

		}
		if (!loading) {

			InteractionManager.runAfterInteractions(() => {
				setInteraction(true);
			})
		}

		return () => {
			setInteraction(false)
		}
	}, [loading]))

	return (
		<ImageBackground style={Style.imageBackground} source={require('../assets/images/backgrounds/bg_gradient_blue_3.png')}>
			<DefaultHeader name={'Putusan'} color="#fff" />
			{!interaction
				? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size={'large'} color={'#fff'} /></View>
				: <>
					<View style={{ alignItems: 'center', marginTop: 10 }}>
						<Image resizeMode="center" style={{ height: 130 }}
							source={
								isPutus == false ? require('../assets/images/court_hammer.png') : require('../assets/images/court_hammer_2.png')
							}
						></Image>
						<Text style={{ fontSize: 20, color: '#fff', fontWeight: '400' }}>
							{isPutus == false ? 'Perkara Anda Belum Diputus' : 'Perkara Anda Sudah Diputus'}
						</Text>
					</View>
					<View style={{ flex: 1 }}>
						<ScrollView>
							<View style={{ padding: 20 }}>
								<Text style={{ fontSize: 15, color: '#6a48bd', fontWeight: 'bold', textAlign: 'center' }}>Amar Putusan</Text>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
									<FaIcon name="calendar-alt" color={'#6a48bd'} size={20}></FaIcon>
									<Text style={{ marginLeft: 10, fontSize: 15, color: '#6a48bd', fontWeight: '400' }}>
										{localDate(putusan ? putusan.tanggal_putusan : '')}
									</Text>
								</View>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
									<FaIcon name="info" color={'#6a48bd'} size={20}></FaIcon>
									<Text style={{ marginLeft: 10, fontSize: 15, color: '#6a48bd', fontWeight: '400' }}>
										{putusan ? Helper.StatusPutusan(putusan.status_putusan_id) : 'Belum Ditemtukan'}
									</Text>
								</View>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
									<FaIcon name="book" color={'#6a48bd'} size={20}></FaIcon>
									<Text style={{ marginLeft: 10, fontSize: 15, color: '#6a48bd', fontWeight: '400' }}>
										Sumber Hukum : {putusan ? Helper.SumberHukum(putusan.sumber_hukum_id) : ''}
									</Text>
								</View>
								{isPutus == false ? <></> : <RenderHtml contentWidth={130} source={(putusan) ? { html: putusan.amar_putusan } : { html: '' }} />}
							</View>
						</ScrollView>
					</View>
				</>
			}

		</ImageBackground>
	)
}