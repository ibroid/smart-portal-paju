import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Beranda from "../screens/Beranda";
import Umum from "../screens/Umum";
import Perkara from "../screens/Perkara";
import JadwalSidang from "../screens/JadwalSidang";
import Keuangan from "../screens/Keuangan";
import AktaCerai from "../screens/AktaCerai";
import Survey from "../screens/Survey";
import PengisianSurvey from "../screens/PengisianSurvey";
import Pendaftaran from "../screens/Pendaftaran";
import HitungBiaya from "../screens/HitungBiaya";
import SidangKeliling from "../screens/SidangKeliling";
import Profil from "../screens/Profil";
import { IMenuStack } from "../interfaces/StackInterface";
import IonIcon from "react-native-vector-icons/Ionicons"
import { IconButton } from "native-base";
const Stack = createNativeStackNavigator<IMenuStack>();

export default function BerandaStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen options={{ headerShown: false }} name="Beranda" component={Beranda} />
			<Stack.Screen name="Umum" component={Umum} />
			<Stack.Screen name="Perkara" component={Perkara} />
			<Stack.Screen name="JadwalSidang" component={JadwalSidang} />
			<Stack.Screen name="Keuangan" component={Keuangan} />
			<Stack.Screen name="AktaCerai" component={AktaCerai} />
			<Stack.Screen name="Survey" component={Survey} />
			<Stack.Screen name="PengisianSurvey" component={PengisianSurvey} />
			<Stack.Screen name="Pendaftaran" component={Pendaftaran} />
			<Stack.Screen name="HitungBiaya" component={HitungBiaya} />
			<Stack.Screen name="SidangKeliling" component={SidangKeliling} />
			<Stack.Screen
				options={
					({ navigation, route }) => ({
						title: "", headerTransparent: true, headerLeft: () => (
							<IconButton
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
						)
					})
				}
				name="Profil"
				component={Profil} />
		</Stack.Navigator>
	)
}