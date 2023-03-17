import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PengumumanStackProps } from "../interfaces/IStackParams";

const Stack = createNativeStackNavigator();
import DaftarPengumuman from "../screens/Pengumuman/DaftarPengumuman";
import KontenPengumuman from "../screens/Pengumuman/KontenPengumuman";

export default function PengumumanStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DaftarPengumuman" component={DaftarPengumuman} />
            <Stack.Screen name="KontenPengumuman" component={KontenPengumuman} />
        </Stack.Navigator>
    )
}