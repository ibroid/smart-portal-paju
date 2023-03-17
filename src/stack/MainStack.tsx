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
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import Splash from "../screens/Splash";
import HttpRequest from "../utility/HttpRequest";
import { Alert, BackHandler, Image } from "react-native";
import { Pressable, View, useToast } from "native-base";

const Tab = createBottomTabNavigator();

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
						tabBarIcon: ({ focused, color, size }) => {
							let iconName;

							if (route.name === 'Home') {
								iconName = focused
									? 'home'
									: 'home-outline';
							} else if (route.name === 'Profil') {
								iconName = focused ? 'person' : 'person-outline';
							}

							// You can return any component that you like here!
							return <Ionicons name={iconName ? iconName : 'home'} size={size} color={color} />;
						},
						tabBarActiveTintColor: '#694CBD',
						tabBarInactiveTintColor: '#694CBD',
						headerShown: false,
						tabBarShowLabel: false,
						tabBarStyle: {
							// backgroundColor: 'red',
							position: 'absolute',
							height: 60,
							bottom: 15,
							marginHorizontal: 70,
							borderRadius: 15

						},
					})}
				>
					<Tab.Screen name="Home" component={BerandaStack} />
					<Tab.Screen name="AmbilAntrian" component={AmbilAntrian}
						options={{
							tabBarIcon: () => <FontAwesome5Icon color={"#fff"} size={25} name={"receipt"} />,
							tabBarButton: (props) => {
								return <CustomTabBarButton {...props} />;
								// return <Image source={require('../assets/icons/plus.png')} />
							}
						}}
					/>
					<Tab.Screen name="Profil" component={Profil} />
				</Tab.Navigator>
			)}

		</NavigationContainer>
	)
}