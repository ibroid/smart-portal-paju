import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ISaksiStack } from "../interfaces/StackInterface";
import AntrianSidang from "../screens/AntrianSidang";
import RiwayatAntrianSidang from "../screens/RiwayatAntrianSidang";
import { IconButton } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator<any>();

export default function AntrianSidangStack() {
  return (
    <Stack.Navigator screenOptions={({ navigation, route }) => ({
      title: "",
      headerTransparent: true,
      headerBackButtonMenuEnabled: false,
      // headerShown: false,
      statusBarTranslucent: true,
      headerLeft: () => {
        return <IconButton
          p={1}
          borderRadius="full"
          icon={<Ionicons color={"#fff"} size={30} name={"chevron-back"} />}
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
    })}>
      <Stack.Screen name="AntrianSidang" component={AntrianSidang} />
      <Stack.Screen name="RiwayatAntrianSidang" component={RiwayatAntrianSidang} />
    </Stack.Navigator>
  )
}