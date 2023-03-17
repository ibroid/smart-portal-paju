import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import Daftar from "../screens/survey/Daftar";
import Pengisian from "../screens/survey/Pengisian";
export default function SurveyStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DaftarSurvey" component={Daftar} />
            <Stack.Screen name="Pengisian" component={Pengisian} />
        </Stack.Navigator>
    )
}