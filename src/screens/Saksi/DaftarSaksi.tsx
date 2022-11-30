import React, { useCallback, useState } from "react";

import { ImageBackground, InteractionManager, ActivityIndicator, ScrollView, Alert } from "react-native";
import { View, Text, Image } from "react-native";
import { Button } from "@rneui/base";
import { SaksiStackProps } from '../../interfaces/IStackParams';
import { TokenState } from "../../state/token";
import { useFocusEffect } from "@react-navigation/native";
import { ISaksiResponse } from "../../interfaces/IResponse";
import { localDate, dateDiff } from "../../service/date";

import DefaultHeader from "../../components/DefaultHeader";
import Style from '../screen.style';
import FaIcon from "react-native-vector-icons/FontAwesome5";
import useHttpRequest from "../../hooks/useHttpRequest";

export default function DaftarSaksi({ navigation }: SaksiStackProps) {

	const tokenState = TokenState.useState();
	const [interaction, setInteraction] = useState<boolean>(false)
	const { data, loading, error, errorMessage } = useHttpRequest<ISaksiResponse[]>('/user/saksi', tokenState.access);

	useFocusEffect(
		useCallback(() => {

			if (error && errorMessage) {
				console.log(errorMessage)
				Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini layanan saksi tidak bisa diakses. Error : " + errorMessage.message, [
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
		}, [loading])
	)


	return (
		<ImageBackground style={Style.imageBackground} source={require('../../assets/images/backgrounds/bg_gradient_blue.png')}>
			<DefaultHeader name={'Daftar Saksi'} color="#fff" />
			<View style={{ marginTop: 25, alignSelf: 'center' }}>
				<Image resizeMode={'center'} style={{ height: 150 }} source={require('../../assets/images/saksi_2.png')}></Image>
			</View>
			{(!data) ?
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator size={'large'} color={'#fff'} />
				</View> :
				<View style={{ margin: 20, padding: 10, backgroundColor: '#fff', marginVertical: 10, borderRadius: 10, flex: 1, maxHeight: 300 }} >
					{(data.length < 1) ?
						<View style={{ justifyContent: 'center', flex: 1 }}><Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: '#ff5768', elevation: 20 }}>Data saksi belum ada. Silahkan tambah saksi</Text></View> :
						<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
							<Text style={{ fontWeight: 'bold', fontSize: 15, color: '#ff5768', elevation: 20, }}>Saksi Satu</Text>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<FaIcon name="user" color={'#6a48bd'} size={15} />
								<Text style={{ marginLeft: 10, color: '#6a48bd', fontSize: 15 }}>Nama : {data[0].nama}</Text>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<FaIcon name="calendar" color={'#6a48bd'} size={15} />
								<Text style={{ marginLeft: 10, color: '#6a48bd', fontSize: 15 }}>Tempat, Tanggal Lahir : {data[0].pihak.tempat_lahir + ' ' + localDate(data[0].pihak.tanggal_lahir)}</Text>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<FaIcon name="male" color={'#6a48bd'} size={15} />
								<Text style={{ marginLeft: 10, color: '#6a48bd', fontSize: 15 }}>Jenis Kelamin : {data[0].pihak.jenis_kelamin == 'L' ? 'Laki-laki' : 'Perempuan'} </Text>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<FaIcon name="user-tie" color={'#6a48bd'} size={15} />
								<Text style={{ marginLeft: 10, color: '#6a48bd', fontSize: 15 }}>Pekerjaan : {data[0].pihak.pekerjaan} </Text>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<FaIcon name="home" color={'#6a48bd'} size={15} />
								<Text style={{ marginLeft: 10, color: '#6a48bd', fontSize: 15 }}>Alamat : {data[0].alamat} </Text>
							</View>

							<View style={{ borderWidth: 2, borderColor: '#6a48bd', marginVertical: 10 }} />
							<Text style={{ fontWeight: 'bold', fontSize: 15, color: '#ff5768', elevation: 20 }}>Saksi Dua</Text>

							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<FaIcon name="user" color={'#6a48bd'} size={15} />
								<Text style={{ marginLeft: 10, color: '#6a48bd', fontSize: 15 }}>Nama : {data[1].nama}</Text>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<FaIcon name="calendar" color={'#6a48bd'} size={15} />
								<Text style={{ marginLeft: 10, color: '#6a48bd', fontSize: 15 }}>Tempat, Tanggal Lahir : {data[1].pihak.tempat_lahir + ' ' + localDate(data[1].pihak.tanggal_lahir)}</Text>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<FaIcon name="male" color={'#6a48bd'} size={15} />
								<Text style={{ marginLeft: 10, color: '#6a48bd', fontSize: 15 }}>Jenis Kelamin : {data[1].pihak.jenis_kelamin == 'L' ? 'Laki-laki' : 'Perempuan'} </Text>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<FaIcon name="user-tie" color={'#6a48bd'} size={15} />
								<Text style={{ marginLeft: 10, color: '#6a48bd', fontSize: 15 }}>Pekerjaan : {data[1].pihak.pekerjaan} </Text>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<FaIcon name="home" color={'#6a48bd'} size={15} />
								<Text style={{ marginLeft: 10, color: '#6a48bd', fontSize: 15 }}>Alamat : {data[1].alamat} </Text>
							</View>
						</ScrollView>}
				</View>}

			<View style={{ alignContent: 'center', alignItems: 'center' }}>
				<Button
					disabled={!interaction ? true : false}
					onPress={() => {
						navigation.push('FormSaksi')
					}}
					title="Tambah Saksi"
					buttonStyle={{
						backgroundColor: '#6a48bd',
						borderColor: 'white',
						borderRadius: 30,
					}}
					containerStyle={{
						borderRadius: 30,
						width: 200,
						marginHorizontal: 50,
						marginVertical: 10,
					}}
					icon={<FaIcon name={'user-plus'} color={'#fff'} style={{ marginHorizontal: 5 }} />}
					titleStyle={{ fontWeight: '600' }}
				/>
			</View>
		</ImageBackground>
	)
}