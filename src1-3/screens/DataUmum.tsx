import React from "react";
import { View, Text, ImageBackground, ScrollView, InteractionManager, ActivityIndicator, Alert } from "react-native";
import { Card } from "@rneui/themed";
import { TokenState } from "../state/token";
import { useFocusEffect } from "@react-navigation/native"
import DefaultHeader from "../components/DefaultHeader";
import Style from "./screen.style";
import useHttpRequest from "../hooks/useHttpRequest";
import { IDataUmumResponse } from "../interfaces/IResponse";
import { AppStackProps } from "../interfaces/IStackParams";

export default function DataUmum({ navigation }: AppStackProps<"DataUmum">) {
	const tokenState = TokenState.useState()
	const { data, loading, error, errorMessage } = useHttpRequest<IDataUmumResponse>('/user/umum', tokenState.access)
	const [interact, setInteract] = React.useState<boolean>(false)

	useFocusEffect(React.useCallback(() => {
		if (error && errorMessage) {
			console.log(errorMessage)
			Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini layanan umum tidak bisa diakses. Error : " + errorMessage.message, [
				{
					"text": "Kembali",
					"onPress": () => navigation.goBack()
				}
			])
		}

		if (!loading) {
			InteractionManager.runAfterInteractions(() => {
				setInteract(true)
			})
		}

		return function cleanup() {
			setInteract(false)
		}
	}, [loading]))

	const ShowLoader = () => {
		return (
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<ActivityIndicator size={'large'} color={'#fff'} />
			</View>
		)
	}

	return (
		<ImageBackground style={Style.imageBackground} source={require('../assets/images/backgrounds/bg_gradient_blue.png')}>
			<DefaultHeader name={'Data Umum'} color={'#fff'} />
			{(!interact && loading) ? <ShowLoader /> :
				<ScrollView>
					<View style={{ flex: 1, marginBottom: 50 }}>
						<Card>
							<Card.Title>Informasi Perkara</Card.Title>
							<Card.Divider />
							<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
								<View style={{ flex: 1 }} >
									<Text>Nomor Perkara :</Text>
								</View>
								<Text>{data?.nomor_perkara}</Text>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
								<View style={{ flex: 1 }} >
									<Text>Jenis Perkara :</Text>
								</View>
								<Text>{data?.jenis_perkara_nama}</Text>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
								<View style={{ flex: 1 }} >
									<Text>Tanggal Mendaftar :</Text>
								</View>
								<Text>{data?.tanggal_pendaftaran}</Text>
							</View>

							<Card.Divider />
							<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
								<View style={{ flex: 1 }} >
									<Text>Tanggal Menikah :</Text>
								</View>
								<Text>{data?.data_pernikahan.tgl_kutipan_akta_nikah}</Text>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
								<View style={{ flex: 1 }} >
									<Text>Nomor Akta Nikah :</Text>
								</View>
								<Text>{data?.data_pernikahan.no_kutipan_akta_nikah}</Text>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
								<View style={{ flex: 1 }} >
									<Text>KUA Tempat Menikah :</Text>
								</View>
								<View style={{ width: 150 }}>
									<Text style={{ textAlign: 'right' }}>{data?.data_pernikahan.kua_tempat_nikah}</Text>
								</View>
							</View>
						</Card>
						<Card>
							<Card.Title>Informasi Para Pihak</Card.Title>
							<Card.Divider />
							<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
								<View style={{ flex: 1 }} >
									<Text>Penggugat/Pemohon :</Text>
								</View>
								<View style={{ width: 150 }}>
									<Text style={{ textAlign: 'right' }}>{data?.pihak1_text}</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
								<View style={{ flex: 1 }} >
									<Text>Alamat</Text>
								</View>
								<View style={{ width: 150 }}>
									<Text style={{ textAlign: 'right' }}>{data?.pihak_satu.alamat}</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
								<View style={{ flex: 1 }} >
									<Text>Kuasa Hukum :</Text>
								</View>
								<View style={{ width: 150 }}>
									<Text>{data?.pihak3_text}</Text>
								</View>
							</View>
							<Card.Divider />
							<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
								<View style={{ flex: 1 }} >
									<Text>Tergugat/Termohon :</Text>
								</View>
								<View style={{ width: 150 }}>
									<Text style={{ textAlign: 'right' }}>{data?.pihak2_text}</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
								<View style={{ flex: 1 }} >
									<Text>Alamat</Text>
								</View>
								<View style={{ width: 150 }}>
									<Text style={{ textAlign: 'right' }}>{data?.pihak_dua.alamat}</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
								<View style={{ flex: 1 }} >
									<Text>Kuasa Hukum :</Text>
								</View>
								<View style={{ width: 150 }}>
									<Text>{data?.pihak4_text}</Text>
								</View>
							</View>
						</Card>
						<Card>
							<Card.Title>Informasi Posita dan Petitum</Card.Title>
							<Card.Divider />
							<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
								<View style={{ flex: 1 }} >
									<Text>Posita :</Text>
								</View>
								<View style={{ width: 300 }}>
									<Text style={{ textAlign: 'justify' }}>
										{data?.posita.replace(/<[^>]*>?/gm, '')}
									</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
								<View style={{ flex: 1 }} >
									<Text>Petitum :</Text>
								</View>
								<View style={{ width: 290 }}>
									<Text style={{ textAlign: 'justify' }}>
										{data?.petitum.replace(/<[^>]*>?/gm, '')}
									</Text>
								</View>
							</View>
						</Card>
					</View>
				</ScrollView>
			}
		</ImageBackground>
	)
}