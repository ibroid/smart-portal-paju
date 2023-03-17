import React, { useCallback, useState } from "react";
import {
	View,
	Text,
	ImageBackground,
	StatusBar,
	Image,
	ScrollView,
	InteractionManager,
	Alert
} from "react-native";

import { TokenState } from "../../state/token";
import { useFocusEffect } from "@react-navigation/native";
import { IKontenResponse } from "../../interfaces/IResponse";
import { PengumumanStackProps } from "../../interfaces/IStackParams";

import RenderHtml from 'react-native-render-html';
import useHttpRequest from "../../hooks/useHttpRequest";
import Style from "../screen.style";
import DefaultHeader from "../../components/DefaultHeader";
import Loading from "../../components/LoadingIndicator";

export default function KontenPengumuman({ route, navigation }: PengumumanStackProps<'KontenPengumuman'>) {

	const { id } = route.params;
	const [interact, setInteract] = useState<boolean>(false);
	const tokenState = TokenState.useState();
	const { data, loading, error, errorMessage } = useHttpRequest<IKontenResponse>('/konten/' + id, tokenState.access);

	useFocusEffect(
		useCallback(() => {

			if (error && errorMessage) {
				console.log(errorMessage)
				Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini layanan pengumuman kantor tidak bisa diakses. Error : " + errorMessage.message, [
					{
						"text": "Kembali",
						"onPress": () => navigation.goBack()
					}
				])
			}

			if (!loading) {

				InteractionManager.runAfterInteractions(() => {
					console.log('ok')
					setInteract(true)

				})
			}

		}, [loading])
	)

	return (
		<ImageBackground style={Style.imageBackground} source={require('../../assets/images/backgrounds/bg_gradient_blue_3.png')}>
			<StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent={true}></StatusBar>
			<DefaultHeader name={(data && data.jenis) ? data.jenis : 'Informasi'} color={'#fff'} />
			{!interact ? <Loading />
				: <>
					<View style={{ marginTop: 0, alignSelf: 'center' }}>
						{(data && data.cover)
							? <Image style={{ width: 200, height: 200 }} source={{ uri: 'http://smart.pajakartautara.id/cover/' + data.cover }}></Image>
							: <Image resizeMode={'cover'} style={{ height: 150 }} source={require('../../assets/images/toa.png')}></Image>
						}

					</View>
					<View style={{ flex: 1, marginTop: 20 }}>
						<Text style={{ color: '#6a48bd', textAlign: 'center', fontWeight: '700' }}>{(data && data.judul) ? data.judul : null}</Text>
						<ScrollView>
							<View style={{ padding: 10 }}>
								<RenderHtml contentWidth={130} source={(data && data.isi) ? { html: data.isi } : { html: '' }} />
							</View>
						</ScrollView>
					</View>
				</>
			}
		</ImageBackground>
	)
}