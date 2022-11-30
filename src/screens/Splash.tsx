import { Image } from "@rneui/base";
import React from "react";
import { View, ImageBackground, Text, StatusBar, ActivityIndicator } from "react-native";

import Styles from "./screen.style";

export default function Splash() {
    return (
        <ImageBackground style={Styles.imageBackground} source={require('../assets/images/backgrounds/bg_gradient_blue.png')}>
            <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent={true}></StatusBar>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ padding: 10 }}>
                    <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', fontWeight: '600' }}>Selamat Datang Di Aplikasi Sarana Bantuan Informasi Akurat Terintegrasi</Text>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Pengadilan Agama Jakarta Utara</Text>
                </View>
                <ActivityIndicator size={'large'} color={'#fff'} />

            </View>
        </ImageBackground>

    )
}