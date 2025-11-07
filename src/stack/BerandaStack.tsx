import * as React from "react";
import Beranda from "../screens/Beranda";
import { IMainStack } from "../interfaces/StackInterface";
import IonIcon from "react-native-vector-icons/Ionicons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Antrian from "../screens/Antrian";
import AntrianSidang from "../screens/AntrianSidang";

const Tab = createBottomTabNavigator<IMainStack>();

export default function BerandaStack() {

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
			{/* <Tab.Screen name="AmbilAntrian" component={AmbilAntrian} options={{
				tabBarIcon: ({ size }) => <IonIcon size={size} color={"#fff"} name="qr-code-outline" />,
				tabBarButton: (props) => {
					return CustomTabBarButton(props);
				}
			}} /> */}
			<Tab.Screen name="Antrian" component={Antrian} options={{
				tabBarIcon: ({ focused, color, size }) => {
					return <IonIcon size={size} color={color} name={focused ? 'easel' : 'easel-outline'} />
				}
			}} />
			{/* <Tab.Screen name="Profil" component={Profil} options={{
				tabBarIcon: ({ focused, color, size }) => {
					return <IonIcon size={size} color={color} name={focused ? 'person' : 'person-outline'} />
				}
			}} /> */}
		</Tab.Navigator>
	)
}