import { Text, View, Spinner } from "native-base";
import * as React from "react";
import { Image } from "react-native";

export default function Splash() {
    return (
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
            <Image style={{ width: 400, height: 300 }} resizeMode={"stretch"} source={require("../assets/images/undraw_File_sync_re_0pcx.png")} />
            <Spinner size={"lg"} />
            <Text bold fontSize={"md"}>Mohon Tunggu</Text>
            <Text bold fontSize={"lg"}>Sedang Memeriksa Jaringan</Text>
        </View >
    )
}