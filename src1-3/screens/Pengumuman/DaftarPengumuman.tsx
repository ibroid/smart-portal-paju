import React, { useState, useCallback } from "react";
import {
	View,
	Text,
	ImageBackground,
	FlatList,
	Alert,
	InteractionManager,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { PengumumanStackProps } from "../../interfaces/IStackParams";
import { TokenState } from "../../state/token";
import { IKontenResponse } from "../../interfaces/IResponse";
import { localDate } from "../../service/date";
import { Card, Button } from "@rneui/themed";

import DefaultHeader from "../../components/DefaultHeader";
import FaIcon from "react-native-vector-icons/FontAwesome5";
import Style from "../screen.style";
import useHttpRequest from "../../hooks/useHttpRequest";
import Loading from "../../components/LoadingIndicator";

export default function DaftarPengumuman({ navigation }: PengumumanStackProps<'DaftarPengumuman'>) {

	const [interact, setInteraction] = useState<boolean>(false);
	const [refreshStatus, setRefreshStatus] = useState(false)

	const tokenState = TokenState.useState();
	const { data, loading, error, errorMessage } = useHttpRequest<IKontenResponse[]>('/konten', tokenState.access);



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
					setInteraction(true)
				})
			}

			return () => {
				setInteraction(false)
			}
		}, [loading]));

	const KontenCard = (props: { item: IKontenResponse }) => {
		return (
			<Card>
				<Card.Title>{props.item.judul}</Card.Title>
				<Card.Divider />
				{!props.item.cover ? null :
					<Card.Image
						style={{ padding: 0 }}
						source={{
							uri:
								'http://smart.pajakartautara.id/cover/' + props.item.cover,
						}}
					/>
				}
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<FaIcon color={'#6a48bd'} name="calendar-alt" />
					<Text style={{ color: '#6a48bd', marginHorizontal: 5 }}>{localDate(props.item.tanggal_dibuat)}</Text>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<FaIcon color={'#6a48bd'} name="user" />
					<Text style={{ color: '#6a48bd', marginHorizontal: 5 }}>{props.item.penulis}</Text>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<FaIcon color={'#6a48bd'} name="tag" />
					<Text style={{ color: '#6a48bd', marginHorizontal: 5 }}>{props.item.jenis}</Text>
				</View>
				<Button
					onPress={() => navigation.push('KontenPengumuman', { id: String(props.item.id) })}
					icon={
						<FaIcon name={'eye'} color={'#fff'} size={20} style={{ marginEnd: 10 }} />
					}
					buttonStyle={{
						borderRadius: 0,
						marginLeft: 0,
						marginRight: 0,
						marginBottom: 0,
					}}
					title="Lihat Pengumuman"
				/>
			</Card>
		)
	}

	return (
		<ImageBackground style={Style.imageBackground} source={require('../../assets/images/backgrounds/bg_gradient_blue.png')}>
			<DefaultHeader name={'Pengumuman'} color={'#fff'} />
			{!interact
				? <Loading />
				: <View style={{ flex: 1 }}>
					{/* <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}> */}
					{/* <PilihKategori /> */}
					{/* </View> */}
					<FlatList data={!data ? [] : data}
						refreshing={refreshStatus}
						onRefresh={() => Alert.alert('Berhasil di Update')}
						renderItem={({ item }) => (
							<KontenCard item={item} />
						)}
						ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Tidak ada pengumuman</Text></View>}
					/>
				</View>
			}

		</ImageBackground>
	)
}