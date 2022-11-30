import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import DaftarSaksi from "../screens/Saksi/DaftarSaksi";
import FormSaksi from "../screens/Saksi/FormSaksi";

export default function SaksiStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DaftarSaksi" component={DaftarSaksi} />
            <Stack.Screen name="FormSaksi" component={FormSaksi} />
        </Stack.Navigator>
    )
} 