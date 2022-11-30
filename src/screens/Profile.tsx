import React, { useCallback } from "react";
import {
	View,
	Text,
	ImageBackground,
	Image,
	ScrollView,
	Alert,
	ActivityIndicator,
	InteractionManager
} from "react-native";

import { GlobalState } from "../state/global";
import { useFocusEffect } from '@react-navigation/native';
import { Button } from "@rneui/base";
import { AxiosError, AxiosResponse } from "axios";
import { IIdentityResponse, ILogoutResponse } from "../interfaces/IResponse";
import { localDate } from "../service/date";
import { UserState } from "../state";
import { TokenState } from "../state/token";
import { AppStackProps } from "../interfaces/IStackParams";

import DefaultHeader from "../components/DefaultHeader";
import HttpClient from "../service/http";
import Styles from "./screen.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useHttpRequest from "../hooks/useHttpRequest";
import Helper from "../service/helper";

export default function Profile({ navigation }: AppStackProps<"Profil">) {


	const userState = UserState.useState();
	const tokenState = TokenState.useState();

	const { data, loading, error, errorMessage } = useHttpRequest<IIdentityResponse>('/user/pihak', tokenState.access);

	useFocusEffect(
		useCallback(() => {
			if (error && errorMessage) {
				console.log(errorMessage)
				Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini layanan profil tidak bisa di akses. Error : " + errorMessage.message, [
					{
						"text": "Kembali",
						"onPress": () => navigation.goBack()
					}
				])
			}


			return () => {
			}

		}, [loading])
	)

	return (
		<ImageBackground style={Styles.imageBackground} source={require('../assets/images/backgrounds/bg_gradient_blue.png')}>
			<DefaultHeader name={'Profile'} color={'#fff'} />
			{!data && loading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<ActivityIndicator size={'large'} color={'#fff'} />
			</View> : <View style={{ flex: 1 }}>
				<ScrollView>
					<View style={{ padding: 10 }}>
						<View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#fff', paddingBottom: 10 }}>
							<Image style={{ height: 60, width: 60, marginRight: 10 }} source={require('../assets/icons/default_user.png')} />
							<View style={{ flexDirection: 'column', padding: 5 }}>
								<Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>{userState.user_fullname}</Text>
								<Text style={{ fontWeight: '400', color: '#fff' }}>NIK : {data?.nomor_indentitas}</Text>
							</View>
						</View>
						<View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#fff' }}>
							<View style={{ flexDirection: 'column', padding: 5 }}>
								<Text style={{ fontWeight: '400', color: '#fff' }}>Nama Terdaftar</Text>
								<Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>{data?.nama}</Text>
							</View>
						</View>
						<View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#fff' }}>
							<View style={{ flexDirection: 'column', padding: 5 }}>
								<Text style={{ fontWeight: '400', color: '#fff' }}>Tempat Tanggal Lahir</Text>
								<Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>{data?.tempat_lahir}. {localDate(data?.tanggal_lahir)}</Text>
							</View>
						</View>
						<View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#fff' }}>
							<View style={{ flexDirection: 'column', padding: 5 }}>
								<Text style={{ fontWeight: '400', color: '#fff' }}>Nomor Telefon</Text>
								<Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>{data?.telepon}</Text>
							</View>
						</View>
						<View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#fff' }}>
							<View style={{ flexDirection: 'column', padding: 5 }}>
								<Text style={{ fontWeight: '400', color: '#fff' }}>Email</Text>
								<Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>{(!data?.email) ? userState.user_email : data?.email}</Text>
							</View>
						</View>
						<View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#fff' }}>
							<View style={{ flexDirection: 'column', padding: 5 }}>
								<Text style={{ fontWeight: '400', color: '#fff' }}>Pekerjaan</Text>
								<Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>{data?.pekerjaan}</Text>
							</View>
						</View>
						<View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#fff' }}>
							<View style={{ flexDirection: 'column', padding: 5 }}>
								<Text style={{ fontWeight: '400', color: '#fff' }}>Pendidikan</Text>
								<Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>{Helper.Pendidikan(data?.pendidikan_id)}</Text>
							</View>
						</View>
						<View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#fff' }}>
							<View style={{ flexDirection: 'column', padding: 5 }}>
								<Text style={{ fontWeight: '400', color: '#fff' }}>Alamat</Text>
								<Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>{data?.alamat}</Text>
							</View>
						</View>
						<View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#fff' }}>
							<View style={{ flexDirection: 'column', padding: 5 }}>
								<Text style={{ fontWeight: '400', color: '#fff' }}>Agama</Text>
								<Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>{Helper.Agama(data?.agama_id)}</Text>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>}
		</ImageBackground>
	)
}