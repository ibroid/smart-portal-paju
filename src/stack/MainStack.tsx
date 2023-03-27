import * as React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Profil from '../screens/Profil';
import AuthStack from '../stack/AuthStack';
import AmbilAntrian from "../screens/AmbilAntrian";
import BerandaStack from '../stack/BerandaStack';
import { AuthContext } from "../context/AuthContext"
import EncryptedStorage from "react-native-encrypted-storage";

import Splash from "../screens/Splash";
import HttpRequest from "../utility/HttpRequest";
import { Alert, BackHandler } from "react-native";
import { Pressable, View, useToast } from "native-base";
import Settings from "../screens/Settings";
import { IMainStack } from "../interfaces/StackInterface";
import Antrian from "../screens/Antrian";

const Tab = createBottomTabNavigator<IMainStack>();

export default function MainStack() {

	const { state, authContext } = React.useContext(AuthContext);
	const toast = useToast();

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

	const CustomTabBarButton = ({ children, onPress }: any) => {
		return <Pressable

			style={{
				top: -20,
				justifyContent: 'center',
				alignItems: 'center',
			}}
			onPress={() => {
				return toast.show({
					title: 'Peringatan',
					description: 'Pengambilan antrian secara online belum dibuka',
					variant: 'solid',
					backgroundColor: 'red.500',
					placement: 'top',
				})
			}}
		>
			{({ isPressed }) => (<View
				style={{
					backgroundColor: '#694CBD',
					width: 60,
					height: 60,
					borderRadius: 35,
					transform: [{
						scale: isPressed ? 0.96 : 1
					}]
				}}
			>
				{children}
			</View>
			)}

		</Pressable>
	}


	return (
		<NavigationContainer>
			{state.userToken == null ? (
				<AuthStack />
			) : (
				<Tab.Navigator
					screenOptions={({ route }) => ({
						tabBarActiveTintColor: '#694CBD',
						tabBarInactiveTintColor: '#694CBD',
						headerShown: false,
						tabBarShowLabel: false,
						tabBarStyle: {
							position: 'absolute',
							height: 55,
							bottom: 15,
							marginHorizontal: 50,
							borderRadius: 15

						},
					})}
				>
					<Tab.Screen name="Home" component={BerandaStack} options={{
						tabBarLabel: "Beranda",
						tabBarIcon: ({ focused, color, size }) => {
							return <Ionicons size={size} color={color} name={focused ? 'grid' : 'grid-outline'} />
						}
					}} />
					<Tab.Screen name="Persidangan" component={Profil} options={{
						tabBarIcon: ({ focused, color, size }) => {
							return <Ionicons size={size} color={color} name={focused ? 'people' : 'people-outline'} />
						}
					}} />
					<Tab.Screen name="AmbilAntrian" component={AmbilAntrian} options={{
						tabBarIcon: ({ size }) => <Ionicons size={size} color={"#fff"} name="qr-code-outline" />,
						tabBarButton: (props) => {
							return CustomTabBarButton(props);
						}
					}} />
					<Tab.Screen name="Antrian" component={Antrian} options={{
						tabBarIcon: ({ focused, color, size }) => {
							return <Ionicons size={size} color={color} name={focused ? 'easel' : 'easel-outline'} />
						}
					}} />
					<Tab.Screen name="Settings" component={Settings} options={{
						tabBarIcon: ({ focused, color, size }) => {
							return <Ionicons size={size} color={color} name={focused ? 'settings' : 'settings-outline'} />
						}
					}} />
				</Tab.Navigator>
			)}

		</NavigationContainer>
	)
}