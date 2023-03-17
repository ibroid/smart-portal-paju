import React from "react";
import { View, Text, TouchableOpacity, ColorValue, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IonIcon from "react-native-vector-icons/Ionicons";

import { useNavigation } from "@react-navigation/native";



export default function DefaultHeader(props: { name: String, color?: ColorValue }): JSX.Element {
    const nav = useNavigation();
    return (
        <SafeAreaView>
            <StatusBar barStyle={props.color ? 'light-content' : 'dark-content'} backgroundColor={'transparent'} translucent={true}></StatusBar>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                <TouchableOpacity onPress={() => nav.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IonIcon name="ios-arrow-undo" color={props.color ? props.color : '#6a48bd'} size={20}></IonIcon>
                    <Text style={{ textAlign: 'center', color: props.color ? props.color : '#6a48bd', fontSize: 15 }} >Kembali</Text>
                </TouchableOpacity>
                <Text style={{ flex: 1, textAlign: 'center', color: props.color ? props.color : '#6a48bd', fontWeight: '800', fontSize: 20, marginRight: 70 }}>{props.name}</Text>
            </View>
        </SafeAreaView>
    )
}