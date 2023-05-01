import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Saksi from "../screens/Saksi";
import { ISaksiStack } from "../interfaces/StackInterface";
import TambahSaksi from "../screens/TambahSaksi";

const Stack = createNativeStackNavigator<ISaksiStack>();

export default function SaksiStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="DaftarSaksi" component={Saksi} />
			<Stack.Screen name="TambahSaksi" component={TambahSaksi} />
		</Stack.Navigator>
	)
}