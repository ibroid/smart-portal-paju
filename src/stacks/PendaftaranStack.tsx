import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlurPendaftaran from "../screens/Pendaftaran/AlurPendaftaran";
import Informasi from "../screens/Informasi";
const Stack = createNativeStackNavigator();

import Persyaratan from "../screens/Pendaftaran/Persyaratan";

export default function PendaftaranStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AlurPendaftaran" component={AlurPendaftaran}></Stack.Screen>
            <Stack.Screen name="Persyaratan" component={Persyaratan}></Stack.Screen>
            <Stack.Screen name="Informasi" component={Informasi} />
        </Stack.Navigator>
    )
}