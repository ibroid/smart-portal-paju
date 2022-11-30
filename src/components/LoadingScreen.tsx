import React from "react";
import Modal from "react-native-modal";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MODE } from "./../conf.json";
import { GlobalState } from "../state/global";

export default function LoadingScreen() {
    const isLoading = GlobalState.useState(indexes => indexes.isLoading)
    const loadingMessage = GlobalState.useState(indexes => indexes.loadingMessage)
    return (
        <Modal isVisible={isLoading} >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ height: 100 }} resizeMode={'center'} source={require('../assets/logo/logo-rotate.gif')} />
                <Text style={{ color: '#fff', marginTop: 10 }}>{loadingMessage}</Text>
            </View>
        </Modal>
    )
}