import * as React from "react";
import Beranda from "../screens/Beranda";
import { IMainStack } from "../interfaces/StackInterface";
import IonIcon from "react-native-vector-icons/Ionicons"
import { useToast, Pressable, View } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AmbilAntrian from "../screens/AmbilAntrian";
import Antrian from "../screens/Antrian";
import AntrianSidang from "../screens/AntrianSidang";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator<IMainStack>();

export default function BerandaStack() {
	const toast = useToast();

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
			<Tab.Screen name="Home" component={Beranda} options={{
				tabBarLabel: "Home",
				tabBarIcon: ({ focused, color, size }) => {
					return <IonIcon size={size} color={color} name={focused ? 'grid' : 'grid-outline'} />
				}
			}} />
			<Tab.Screen name="Persidangan" component={AntrianSidang} options={{
				tabBarIcon: ({ focused, color, size }) => {
					return <IonIcon size={size} color={color} name={focused ? 'people' : 'people-outline'} />
				}
			}} />
			<Tab.Screen name="AmbilAntrian" component={AmbilAntrian} options={{
				tabBarIcon: ({ size }) => <IonIcon size={size} color={"#fff"} name="qr-code-outline" />,
				tabBarButton: (props) => {
					return CustomTabBarButton(props);
				}
			}} />
			<Tab.Screen name="Antrian" component={Antrian} options={{
				tabBarIcon: ({ focused, color, size }) => {
					return <IonIcon size={size} color={color} name={focused ? 'easel' : 'easel-outline'} />
				}
			}} />
			<Tab.Screen name="Settings" component={Settings} options={{
				tabBarIcon: ({ focused, color, size }) => {
					return <IonIcon size={size} color={color} name={focused ? 'settings' : 'settings-outline'} />
				}
			}} />
		</Tab.Navigator>
	)
}