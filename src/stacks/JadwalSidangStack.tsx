import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import JadwalSidang from "../screens/JadwalSidang";

export default function JadwalSidangStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="JadwalSidang" component={JadwalSidang}></Stack.Screen>
        </Stack.Navigator>
    )
}