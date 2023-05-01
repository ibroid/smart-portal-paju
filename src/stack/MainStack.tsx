import * as React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Profil from '../screens/Profil';
import AuthStack from '../stack/AuthStack';
import BerandaStack from '../stack/BerandaStack';
import { AuthContext } from "../context/AuthContext"
import EncryptedStorage from "react-native-encrypted-storage";

import Splash from "../screens/Splash";
import HttpRequest from "../utility/HttpRequest";
import { Alert, BackHandler } from "react-native";
import { IconButton, Pressable, View, useToast } from "native-base";
import { IMenuStack } from "../interfaces/StackInterface";
import AktaCerai from "../screens/AktaCerai";
import HitungBiaya from "../screens/HitungBiaya";
import JadwalSidang from "../screens/JadwalSidang";
import Keuangan from "../screens/Keuangan";
import Pendaftaran from "../screens/Pendaftaran";
import PengisianSurvey from "../screens/PengisianSurvey";
import Perkara from "../screens/Perkara";
import Produk from "../screens/Produk";
import SidangKeliling from "../screens/SidangKeliling";
import Survey from "../screens/Survey";
import Umum from "../screens/Umum";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SaksiStack from "./SaksiStack";
import IonIcon from "react-native-vector-icons/Ionicons";

const Stack = createNativeStackNavigator<IMenuStack>();

export default function MainStack() {

	const { state, authContext } = React.useContext(AuthContext);

	React.useEffect(() => {
		const bootstrapAsync = () => {

			HttpRequest.request.get('cek')
				.then(async (res) => {

					const userToken = await EncryptedStorage.getItem('token');

					userToken ? authContext.restore(userToken) : authContext.signOut();
				})
				.catch(error => {
					Alert.alert("Pemberitahuan", "Tidak terhubung ker server. Error :" + error.message, [
						{
							text: "Keluar",
							onPress: () => BackHandler.exitApp()
						}
					])
				})
		};

		bootstrapAsync();
	}, []);

	if (state.isLoading == true) {
		return <Splash />
	}


	return (
		<NavigationContainer
		>
			{state.userToken == null ? (
				<AuthStack />
			) : (
				<Stack.Navigator
					screenOptions={({ navigation, route }) => ({
						title: "",
						headerTransparent: true,
						headerBackButtonMenuEnabled: false,
						// headerShown: false,
						statusBarTranslucent: true,
						headerLeft: () => {
							return <IconButton
								p={1}
								borderRadius="full"
								icon={<IonIcon color={"#fff"} size={30} name={"chevron-back"} />}
								_pressed={{
									bg: 'coolGray.800:alpha.20',
									_ios: {
										_icon: {
											size: '2xl'
										}
									}
								}}
								onPress={() => navigation.goBack()}
							/>
						}
					})}
				>
					<Stack.Screen options={{ headerShown: false }} name="Beranda" component={BerandaStack} />
					<Stack.Screen name="Umum" component={Umum} />
					<Stack.Screen name="Perkara" component={Perkara} />
					<Stack.Screen name="JadwalSidang" component={JadwalSidang} />
					<Stack.Screen name="Keuangan" component={Keuangan} />
					<Stack.Screen name="Produk" component={Produk} />
					<Stack.Screen name="Survey" component={Survey} />
					<Stack.Screen name="PengisianSurvey" component={PengisianSurvey} />
					<Stack.Screen name="Pendaftaran" component={Pendaftaran} />
					<Stack.Screen name="HitungBiaya" component={HitungBiaya} />
					<Stack.Screen name="SidangKeliling" component={SidangKeliling} />
					<Stack.Screen name="Profil" component={Profil} />
					<Stack.Screen name="AktaCerai" component={AktaCerai} />
					<Stack.Screen
						options={{ headerShown: false }}
						name="Saksi"
						component={SaksiStack} />
				</Stack.Navigator>
			)}

		</NavigationContainer>
	)
}